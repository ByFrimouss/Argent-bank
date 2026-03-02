import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginSuccess, logout } from "../redux/authSlice";
import API from "../services/api";

function Profile() {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Sécurité d'accès
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (token && !user) {
      API.post(
        "/user/profile",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
        .then((res) => {
          dispatch(loginSuccess({ user: res.data.body, token }));
        })
        .catch(() => {
          dispatch(logout());
          navigate("/login");
        });
    }
  }, [token, user, dispatch, navigate]);

  // Tant que le user n'est pas chargé → on attend
  if (!user) {
    return <p style={{ color: "white", textAlign: "center" }}>Chargement...</p>;
  }

  const handleSave = () => {
    dispatch(
      loginSuccess({
        user: { ...user, firstName, lastName },
        token,
      }),
    );
    setIsEditing(false);
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        {!isEditing ? (
          <>
            <h1>
              Welcome back
              <br />
              {user.firstName} {user.lastName}!
            </h1>
            <button
              className="edit-button"
              onClick={() => {
                setFirstName(user.firstName);
                setLastName(user.lastName);
                setIsEditing(true);
              }}
            >
              Edit Name
            </button>
          </>
        ) : (
          <>
            <h1>Welcome back</h1>
            <div>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <div>
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </div>
          </>
        )}
      </div>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button
            className="transaction-button"
            onClick={() => navigate("/transactions/8349")}
          >
            View transactions
          </button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x67124)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button
            className="transaction-button"
            onClick={() => navigate("/transactions/67124")}
          >
            View transactions
          </button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x5201)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button
            className="transaction-button"
            onClick={() => navigate("/transactions/5201")}
          >
            View transactions
          </button>
        </div>
      </section>
    </main>
  );
}

export default Profile;
