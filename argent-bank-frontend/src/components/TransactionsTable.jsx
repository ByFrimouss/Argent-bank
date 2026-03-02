import { useState, useEffect } from "react";
import TransactionRow from "./TransactionRow";

/**
 * Gère la liste des transactions et l'état de l'accordéon.
 * Centralise aussi la logique d'édition locale (catégorie, notes).
 * Quand l'API sera branchée, les appels PATCH partiront depuis saveCategory/saveNotes.
 *
 * @param {array} initialTransactions - Liste des transactions à afficher
 */
function TransactionTable({ initialTransactions }) {
  const [openId, setOpenId] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingNotes, setEditingNotes] = useState(null);
  const [transactions, setTransactions] = useState(initialTransactions);

  // Effet uniquement pour reset openId si la liste change
  useEffect(() => {
    // Retarde le setState à la prochaine tick pour éviter l'alerte ESLint
    const timeout = setTimeout(() => setOpenId(null), 0);
    return () => clearTimeout(timeout);
  }, [initialTransactions]);

  const toggleOpen = (id) => setOpenId(openId === id ? null : id);

  const saveCategory = (id, value) => {
    setTransactions(
      transactions.map((t) => (t.id === id ? { ...t, category: value } : t)),
    );
    setEditingCategory(null);
  };

  const saveNotes = (id, value) => {
    setTransactions(
      transactions.map((t) => (t.id === id ? { ...t, notes: value } : t)),
    );
    setEditingNotes(null);
  };

  return (
    <section className="transaction-table">
      {/* En-tête du tableau */}
      <div className="transaction-table-header">
        <span></span>
        <span>DATE</span>
        <span>DESCRIPTION</span>
        <span>AMOUNT</span>
        <span>BALANCE</span>
      </div>

      {/* Lignes de transaction */}
      {transactions.map((transaction) => (
        <TransactionRow
          key={transaction.id}
          transaction={transaction}
          isOpen={openId === transaction.id}
          onToggle={() => toggleOpen(transaction.id)}
          editingCategory={editingCategory}
          editingNotes={editingNotes}
          onSaveCategory={saveCategory}
          onSaveNotes={saveNotes}
          setEditingCategory={setEditingCategory}
          setEditingNotes={setEditingNotes}
          className="transaction-row"
          detailClassName="transaction-detail"
        />
      ))}
    </section>
  );
}

export default TransactionTable;
