import { useNavigate, useParams } from "react-router-dom";
import AccountHeader from "../components/AccountHeader";
import TransactionTable from "../components/TransactionsTable";
import { MOCK_TRANSACTIONS, ACCOUNTS_INFO } from "../services/mockTransactions";
import "./Transactions.scss";

/**
 * Page Transactions — affiche les transactions d'un compte bancaire spécifique.
 *
 * Route : /transactions/:accountId
 * Paramètre :accountId — correspond aux clés de ACCOUNTS_INFO (ex: "8349", "67124", "5201")
 *
 * Actuellement basée sur des données mock (MOCK_TRANSACTIONS, ACCOUNTS_INFO).
 * Quand l'API sera disponible, remplacer par :
 *   GET /accounts/:accountId        → infos du compte
 *   GET /accounts/:accountId/transactions → liste des transactions
 */
function Transactions() {
  const navigate = useNavigate();
  const { accountId } = useParams();

  // Récupère les infos du compte depuis l'id dans l'URL
  // Fallback générique si l'accountId est inconnu
  const accountInfo = ACCOUNTS_INFO[accountId] || {
    name: "Account",
    balance: "$0.00",
    description: "",
  };

  const accountTransactions = MOCK_TRANSACTIONS[accountId] || [];

  return (
    <main className="main bg-dark">
      <AccountHeader {...accountInfo} />

      <button
        className="edit-button"
        onClick={() => navigate("/profile")}
        style={{ margin: "20px auto", display: "block" }}
      >
        ← Back to accounts
      </button>

      <TransactionTable initialTransactions={accountTransactions} />
    </main>
  );
}

export default Transactions;
