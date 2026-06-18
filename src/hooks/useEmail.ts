import emailjs from "@emailjs/browser";
// EmailJSライブラリを読み込み（メール送信機能を使うため）

export const useEmail = () => {
  // カスタムフック：EmailJSの送信処理をまとめて使いやすくする

  const sendEmail = async (templateParams: {
    name: string;
    furigana: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    return emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      // EmailJSのサービスID（.envから取得）
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      //templateParamsは関数の引数であり、ContactFormからsendEmail関数に渡された入力データを受け取るための変数である。そのためContactFormを直接呼び出しているわけではなく、関数間でデータを受け渡している。
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
  };

  return { sendEmail };
  // 外からsendEmailだけ使えるように返している
};