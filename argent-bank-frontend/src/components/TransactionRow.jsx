import TransactionDetail from "./TransactionDetail";

/**
 * Représente une ligne de transaction avec comportement accordéon.
 * Au clic, affiche ou masque le détail (TransactionDetail).
 *
 * @param {object}   transaction - Objet transaction complet
 * @param {boolean}  isOpen      - Si true, le détail est affiché
 * @param {function} onToggle    - Callback pour ouvrir/fermer l'accordéon
 * + props transmises à TransactionDetail (édition catégorie/notes)
 */
function TransactionRow({ transaction, isOpen, onToggle, ...detailProps }) {
  return (
    <div
      style={{
        borderBottom: "1px solid #ddd",
        background: "white",
        marginBottom: 2,
      }}
    >
      {/* Ligne cliquable — ouvre/ferme le détail */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "40px 1fr 1fr 1fr 1fr",
          padding: "15px 20px",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={onToggle}
      >
        {/* Indicateur visuel de l'état accordéon */}
        <span style={{ color: "#00bc77", fontSize: 18 }}>
          {isOpen ? "▲" : "▼"}
        </span>
        <span>{transaction.date}</span>
        <span>{transaction.description}</span>
        <span>${transaction.amount.toFixed(2)}</span>
        <span>${transaction.balance.toFixed(2)}</span>
      </div>

      {/* Détail conditionnel — affiché uniquement si la ligne est ouverte */}
      {isOpen && (
        <TransactionDetail transaction={transaction} {...detailProps} />
      )}
    </div>
  );
}

export default TransactionRow;
