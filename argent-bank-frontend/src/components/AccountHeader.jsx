/**
 * Affiche l'en-tête de la page Transactions :
 * nom du compte, solde et type de solde (disponible / actuel).
 *
 * @param {string} name        - Nom du compte (ex: "Argent Bank Checking (x8349)")
 * @param {string} balance     - Solde formaté (ex: "$2,082.79")
 * @param {string} description - Type de solde (ex: "Available Balance")
 */
function AccountHeader({ name, balance, description }) {
  return (
    <div className="header">
      <h1>{name}</h1>
      <p className="account-amount">{balance}</p>
      <p className="account-amount-description">{description}</p>
    </div>
  );
}

export default AccountHeader;
