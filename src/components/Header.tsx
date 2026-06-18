import logo from "../assets/logo.svg"; //ロゴ画像を読み込む
import NavBar from "./Navbar";//ナビゲーションバーコンポーネントを読み込む

function Header() {
  return (
    <header>
      <img src={logo} alt="logo" />
      <NavBar /> {/* ナビゲーションメニューを表示 */}
    </header>
  );
}

export default Header;