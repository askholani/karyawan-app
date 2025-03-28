export const Navbar = () => {
  return (
    <nav class="navbar bg-white tertiary position-fixed shadow-sm w-100 z-3">
      <div class="container-fluid d-flex justify-content-between">
        <a class="navbar-brand" href="#">
          Klinik Training
        </a>
        <a class="navbar-brand" href="#">
          <img
            src="https://medeva.tech/wp-content/uploads/2024/09/logo-medeva-text.png"
            width={110}
            alt=""
          />
        </a>

        <div className="d-flex align-items-center column-gap-3">
          <div className="d-flex flex-column text-end">
            <p className="fw-medium">kliniktraining</p>
            <p>role</p>
          </div>
          <div class="dropdown">
            <img
              src="https://avatars.githubusercontent.com/u/77468756?v=4"
              class=" dropdown-toggle rounded-circle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              width={35}
            ></img>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <button class="dropdown-item" type="button">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
