import { useState } from 'react'
import "../App.css";
import { useEmail } from "../hooks/useEmail";
//EmailJSでメール送信機能を使うために、カスタムフックuseEmailを読み込んでいる

function ContactForm() {
  const { sendEmail } = useEmail();
  // useEmailカスタムフックからメール送信機能（sendEmail）だけを取り出して使えるようにしている

  const [name, setName] = useState('')
  const [furigana, setFurigana] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // フォーム送信時の処理を定義している関数
  // asyncをつけることで、メール送信のような時間がかかる非同期処理を扱えるようにしている
  const handleSubmit = async (e: React.FormEvent) => {
    // ページが再読み込みされるのを防ぐための処理
    e.preventDefault();
  
    //if (!name)は、nameが空の場合に条件がtrueになり、「名前を入力してください」というエラーメッセージを表示するための処理である。
    if (!name) {
      alert("名前を入力してください");
      return;
    }
    if (!furigana) {
      alert("フリガナを入力してください");
      return;
    }
    //includesは文字列の中に指定した文字が含まれているかを調べるメソッドで、@が含まれていない場合にエラーを出すために使用している。
    if (!email.includes("@")) {
      alert("正しいメールアドレスを入力してください");
      return;
    }
    //if (!subject)は、件名が未選択（空）の場合に条件がtrueとなり、件名の入力を必須にするためのバリデーションである。
    if (!subject) {
      alert("件名を選択してください");
      return;
    }
    //message.length < 10は、お問い合わせ内容の文字数が10文字未満の場合に条件がtrueとなり、10文字以上の入力を必須にするためのバリデーションである。
    if (message.length < 10) {
      alert("お問い合わせ内容は10文字以上入力してください");
      return;
    }

    // メール送信処理を実行（成功・失敗の可能性があるためtryで囲む）
    try {
      //sendEmailにはフォームで入力された名前・フリガナ・メールアドレス・件名・お問い合わせ内容をオブジェクトとして渡しており、EmailJSでメールを作成・送信するためのデータを指定している。
      await sendEmail({
        name,
        furigana,
        email,
        subject,
        message,
      });
      
      // 送信が成功した場合に表示するメッセージ
      alert("送信が完了しました");
      
      // 送信成功時にフォームをリセット
      setName("");
      setFurigana("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      // 送信処理でエラーが発生した場合にここに入る
      console.error(error);
      // ユーザーに送信失敗を知らせるメッセージ
      alert("送信に失敗しました。時間をおいて再度お試しください。");
    }
  };

  return (
    // フォーム送信時にhandleSubmit関数を実行するように設定している
    <form onSubmit={handleSubmit}>

      <div className="form-group">
        <label>名前</label>
        <input
          type="text"
          value={name}
          placeholder="山田 太郎"
          onChange={(e) => setName(e.target.value)}
          // eはイベントオブジェクトであり、入力変更時に発生した情報をまとめたもので、その中のe.target.valueを使うことで入力された値を取得している。
        />
        {/* 名前入力欄。入力内容はname(state)で管理し、変更時にsetNameで更新する */}
      </div>

      <div className="form-group">
        <label>フリガナ</label>
        <input
          type="text"
          value={furigana}
          placeholder="ヤマダ タロウ"
          onChange={(e) => setFurigana(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>メールアドレス</label>
        <input
          type="email"
          value={email}
          placeholder="nnnnnn.nnnn@nnnn.nnnn"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>件名</label>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={subject === "" ? "is-empty" : ""}
          /* subjectが未選択の場合のみ「is-empty」クラスを付けて文字色をグレーにする */
          >
          {/*valueが空の状態では、最初のoptionが表示される仕様を利用して、未選択状態を表すダミーの選択肢を初期表示として設定している。*/}
          <option value="" disabled hidden>件名を選択</option>
          <option value="webサイト制作について">webサイト制作について</option>
          <option value="LP（ランディングページ）制作について">LP（ランディングページ）制作について</option>
          <option value="システム開発について">システム開発について</option>
          <option value="お見積もり依頼">お見積もり依頼</option>
          <option value="ご相談・お問い合わせ">ご相談・お問い合わせ</option>
          <option value="その他">その他</option>
        </select>
      </div>

      <div className="form-group">
        <label>お問い合わせ内容</label>
        <textarea
          rows={8} //rows属性はtextareaの表示される高さ（行数）を指定するものであり、入力可能な文字数ではなく見た目の大きさを調整するための設定である。
          value={message}
          placeholder="お問い合わせ内容を入力してください"
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className="btn-container">
        <button type="submit">送信</button>
      </div>
    </form>
  )
}

export default ContactForm;