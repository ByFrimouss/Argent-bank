import { CATEGORIES } from "../services/mockTransactions";

/**
 * Affiche le détail d'une transaction dans l'accordéon :
 * - Type de transaction (lecture seule)
 * - Catégorie (éditable via dropdown)
 * - Notes (éditables via input texte)
 *
 * @param {object}   transaction     - Objet transaction complet
 * @param {string}   editingCategory - Id de la transaction en cours d'édition (catégorie)
 * @param {string}   editingNotes    - Id de la transaction en cours d'édition (notes)
 * @param {function} onSaveCategory  - Callback (id, value) pour sauvegarder la catégorie
 * @param {function} onSaveNotes     - Callback (id, value) pour sauvegarder les notes
 * @param {function} setEditingCategory - Active le mode édition catégorie
 * @param {function} setEditingNotes    - Active le mode édition notes
 */
function TransactionDetail({
  transaction,
  editingCategory,
  editingNotes,
  onSaveCategory,
  onSaveNotes,
  setEditingCategory,
  setEditingNotes,
}) {
  return (
    <div style={{ padding: "10px 20px 20px 60px", background: "#f9f9f9" }}>
      {/* Type — lecture seule, non modifiable selon les specs */}
      <p style={{ margin: "5px 0" }}>
        <strong>Transaction Type:</strong> {transaction.type}
      </p>

      {/* Catégorie — éditable via un select dropdown */}
      <p
        style={{
          margin: "5px 0",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <strong>Category:</strong>
        {editingCategory === transaction.id ? (
          <select
            defaultValue={transaction.category}
            onChange={(e) => onSaveCategory(transaction.id, e.target.value)}
            onBlur={(e) => onSaveCategory(transaction.id, e.target.value)}
            autoFocus
            style={{ padding: "2px 6px", borderRadius: 4 }}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        ) : (
          <>
            {transaction.category}
            <button
              onClick={() => setEditingCategory(transaction.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#00bc77",
              }}
            >
              ✏️
            </button>
          </>
        )}
      </p>

      {/* Notes — texte libre, sauvegarde au blur ou à la touche Entrée */}
      <p
        style={{
          margin: "5px 0",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <strong>Notes:</strong>
        {editingNotes === transaction.id ? (
          <input
            defaultValue={transaction.notes}
            onBlur={(e) => onSaveNotes(transaction.id, e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && onSaveNotes(transaction.id, e.target.value)
            }
            autoFocus
            style={{ padding: "2px 6px", borderRadius: 4, minWidth: 200 }}
          />
        ) : (
          <>
            {transaction.notes || "—"}
            <button
              onClick={() => setEditingNotes(transaction.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#00bc77",
              }}
            >
              ✏️
            </button>
          </>
        )}
      </p>
    </div>
  );
}

export default TransactionDetail;
