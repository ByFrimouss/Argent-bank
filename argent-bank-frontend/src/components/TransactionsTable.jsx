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
  // Id de la ligne actuellement ouverte (une seule à la fois)
  const [openId, setOpenId] = useState(null);

  // Id de la transaction dont la catégorie est en cours d'édition
  const [editingCategory, setEditingCategory] = useState(null);

  // Id de la transaction dont les notes sont en cours d'édition
  const [editingNotes, setEditingNotes] = useState(null);

  // Copie locale des transactions pour permettre l'édition sans API
  const [transactions, setTransactions] = useState(initialTransactions);

  useEffect(() => {
    setTransactions(initialTransactions);
    setOpenId(null);
  }, [initialTransactions]);

  const toggleOpen = (id) => setOpenId(openId === id ? null : id);

  /**
   * Met à jour la catégorie d'une transaction localement.
   * TODO: remplacer par un appel PATCH /transactions/:id quand l'API sera prête
   */
  const saveCategory = (id, value) => {
    setTransactions(
      transactions.map((t) => (t.id === id ? { ...t, category: value } : t)),
    );
    setEditingCategory(null);
  };

  /**
   * Met à jour les notes d'une transaction localement.
   * TODO: remplacer par un appel PATCH /transactions/:id quand l'API sera prête
   */
  const saveNotes = (id, value) => {
    setTransactions(
      transactions.map((t) => (t.id === id ? { ...t, notes: value } : t)),
    );
    setEditingNotes(null);
  };

  return (
    <section style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px" }}>
      {/* En-tête fixe du tableau */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "40px 1fr 1fr 1fr 1fr",
          padding: "10px 20px",
          color: "#aaa",
          fontSize: 14,
          fontWeight: "bold",
          borderBottom: "1px solid #ccc",
        }}
      >
        <span></span>
        <span>DATE</span>
        <span>DESCRIPTION</span>
        <span>AMOUNT</span>
        <span>BALANCE</span>
      </div>

      {/* Rendu de chaque ligne de transaction */}
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
        />
      ))}
    </section>
  );
}

export default TransactionTable;
