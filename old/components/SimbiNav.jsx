export default function SimbiNav() {
  return (
    <div>
      <nav className="default shown" id="top-navbar">
        <div
          className="container wide flex items-center"
          style={{ height: "54px" }}
        >
          <label
            className="visible-xs"
            htmlFor="mobile-nav-trigger"
            id="toggle-mobile-menu"
          ></label>
          <div className="nav-brand">
            <a href=""></a>
          </div>

          <div className="nav-search hidden-xs">
            <div className="has-search-icon plain-links">
              <span className="twitter-typeahead">
                <input
                  autoComplete="off"
                  className="htmlForm-control no-border suggest-category typeahead tt-hint"
                  type="search"
                  readOnly
                  spellCheck="false"
                  tabIndex={-1}
                  dir="ltr"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    borderColor: "transparent",
                    boxShadow: "none",
                    opacity: 1,
                    background: "none",
                  }}
                />
                <input
                  autoComplete="off"
                  className="htmlForm-control no-border suggest-category typeahead tt-input"
                  id="filter-keyword"
                  placeholder="Search"
                  type="search"
                  spellCheck="false"
                  dir="auto"
                  style={{
                    position: "relative",
                    verticalAlign: "top",
                    backgroundColor: "transparent",
                  }}
                />
                <pre
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    visibility: "hidden",
                    whiteSpace: "pre",
                    fontFamily:
                      'Lato, "Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontSize: 18,
                    fontStyle: "normal",
                    fontVariant: "normal",
                    fontWeight: 400,
                    wordSpacing: 0,
                    letterSpacing: 0,
                    textIndent: 0,
                    textRendering: "auto",
                    textTransform: "none",
                  }}
                />
              </span>
              <a
                className="small ellipsis visible-md visible-lg nav-address"
                data-target="#location-modal"
                data-toggle="modal"
                href=""
              >
                <div>25 miles</div>Ashburn, US
              </a>
            </div>
          </div>

          <a
            className="btn btn-default visible-xs"
            data-target="#credits-modal"
            data-toggle="modal"
            role="button"
          >
            <span className="simbi-currency">0</span>
          </a>

          <div className="nav-right hidden-xs">
            <div className="nav-divider"></div>
            <a
              className="nav-item"
              data-target="#credits-modal"
              data-toggle="modal"
              href=""
            >
              <span className="simbi-currency">0</span>
            </a>
            <div className="nav-divider"></div>
            <a className="nav-item" href="">
              How It Works
            </a>
            <div className="nav-divider"></div>
            <a className="nav-item" href="">
              Log In
            </a>
            <div className="nav-divider"></div>
            <a className="join-btn nav-item" href="">
              Join
            </a>
            <div className="nav-divider"></div>
            <div className="dropdown flex">
              <a className="nav-item dropdown-toggle" href="#">
                <i className="fa fa-lg fa-globe"></i>
              </a>
              <ul className="dropdown-menu" role="menu">
                <li>
                  <a data-lang="en" href="#">
                    English
                  </a>
                </li>
                <li>
                  <a data-lang="fr" href="#">
                    French
                  </a>
                </li>
                <li>
                  <a data-lang="es" href="#">
                    Spanish
                  </a>
                </li>
                <li>
                  <a data-lang="de" href="#">
                    German
                  </a>
                </li>
                <li>
                  <a data-lang="nl" href="#">
                    Dutch
                  </a>
                </li>
                <li>
                  <a data-lang="pt" href="#">
                    Portuguese
                  </a>
                </li>
                <li>
                  <a data-lang="it" href="#">
                    Italian
                  </a>
                </li>
                <li>
                  <a data-lang="tr" href="#">
                    Turkish
                  </a>
                </li>
                <li>
                  <a data-lang="ar" href="#">
                    Arabic
                  </a>
                </li>
                <li>
                  <a data-lang="bg" href="#">
                    Bulgarian
                  </a>
                </li>
                <li>
                  <a data-lang="ru" href="#">
                    Russian
                  </a>
                </li>
                <li>
                  <a data-lang="zh-CN" href="#">
                    Chinese (Simplified)
                  </a>
                </li>
                <li>
                  <a data-lang="ja" href="#">
                    Japanese
                  </a>
                </li>
                <li>
                  <a data-lang="ko" href="#">
                    Korean
                  </a>
                </li>
              </ul>
            </div>
            <div className="nav-divider"></div>
          </div>
        </div>
      </nav>
    </div>
  )
}
