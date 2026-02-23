import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react"; // ← ajoute useEffect
import { useNavigate } from "react-router-dom"; // ← ajoute useNavigate
import { loginSuccess } from "../redux/authSlice";
import API from "../services/api"; // ← ajoute l'import API

function Profile() {
  const { user, token, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ← ajoute ça

  // ← ajoute ce useEffect AVANT le if (!isAuthenticated)
  useEffect(() => {
    if (token && !user) {
      API.get("/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => dispatch(loginSuccess({ user: res.data.body, token })))
        .catch(() => navigate("/login"));
    }
  }, []);

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");

  if (!isAuthenticated) {
    return <p className="profile__error">Veuillez vous connecter.</p>;
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
            <button className="edit-button" onClick={() => setIsEditing(true)}>
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
          <button className="transaction-button">View transactions</button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x67124)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x5201)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
}

export default Profile;
