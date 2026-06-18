import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactForm from "../components/contactForm";

function Home() {
  return (
    <>
      <Header />

      <main>
        <h1>お問い合わせ</h1>

        <p>
          ご入力内容を確認のうえ送信してください
          <br />
          ※確認画面はありません
        </p>

        <ContactForm />
      </main>

      <Footer />
    </>
  );
}

export default Home;