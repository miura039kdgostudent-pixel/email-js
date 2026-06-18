import logo from "../assets/logo.svg"; //ロゴ画像を読み込む
import NavBar from "./Navbar"; //ナビゲーションバーコンポーネントを読み込む

function Header() {
  return (
    <header>
      {/* ロゴとテキストをまとめるコンテナを追加 */}
      <div className="header-logo-set">
        <img src={logo} alt="logo" />
        <span className="header-title">TYPE SCRIPT</span>
      </div>
      
      <NavBar /> {/* ナビゲーションメニューを表示 */}
    </header>
  );
}

export default Header;