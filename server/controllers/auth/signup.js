require('dotenv').config();
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { user } = require('../../models');
const { checkAccessToken } = require('../../middlewares/tokenFunction');
const { emailVerify } = require('../../middlewares/email/email-content');
const emailSend = require('../../middlewares/email/email-send');

module.exports = {
  post: async (req, res) => {
    try {
      /**
       *
       * [에러 처리]
       *
       */

      // 이미 로그인 되어있는 경우는 다음을 리턴한다.
      const { accessToken } = req.cookies;
      const accessTokenData = checkAccessToken(accessToken);
      if (accessTokenData) {
        return res.status(400).json({ message: 'Already logged in!' });
      }

      // 요청이 잘못된 경우는 다음을 리턴한다.
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Bad Request!' });
      }

      // 요청받은 이메일 정보로 등록된 이미 회원이 존재하는 경우는 다음을 리턴한다.
      const userInfo = await user.findOne({ where: { email } });
      if (userInfo) {
        return res
          .status(409)
          .json({ message: 'This email information cannot be registered' });
      }

      /**
       *
       * [신규 회원 생성]
       *
       */

      // 회원 이메일 인증 키 생성
      const key_one = crypto.randomBytes(256).toString('hex').substr(100, 5);
      const key_two = crypto.randomBytes(256).toString('base64').substr(50, 5);
      const key_for_verify = await bcrypt.hash(key_one + key_two, 12);

      // 등록 가능한 정보라면 비밀번호를 암호화하고 새로운 회원을 생성한다.
      const hash = await bcrypt.hash(password, 12);
      const newUser = await user.create({
        name,
        email,
        nickname: name + Date.now(), // 닉네임 초기화
        password: hash,
        signup_method: '일반',
        key_for_verify
      });

      /**
       *
       * [이메일 인증 이메일 전송]
       *
       */

      // 이메일 인증 확인 URL
      const url =
        process.env.SERVER_ORIGIN + '/confirm/email?key=' + key_for_verify;

      // 이메일 전송
      const emailContent = emailVerify(email, name, url);
      // console.log(emailContent);
      emailSend(emailContent);

      // 새로 생성한 회원의 아이디를 반환한다.
      res.status(201).json({ id: newUser.dataValues.id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error!' });
    }
  }
};