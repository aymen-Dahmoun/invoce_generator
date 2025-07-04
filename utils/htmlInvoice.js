/**
 * invoicePrinter.js
 * Generates and shares either a "Bon de Commande" or "Bon de Livraison" PDF
 */
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { getData } from "../LocalCache/storageUtils";

/**
 * Generate HTML for either a 'Bon de Commande' or 'Bon de Livraison'
 * @param {object} params
 * @param {'commande'|'livraison'} params.invoiceType
 * @param {number|string} params.invoiceNumber
 * @param {string} params.clientName
 * @param {string} params.invoiceDate
 * @param {Array} params.products
 * @param {number} params.soldeAnt
 * @param {number} params.totalBon
 * @param {number} params.vrsJour
 * @param {number} params.soldeGlobal
 * @param {object} params.userInfo
 * @returns {string} HTML string
 */
function generateInvoiceHTML({
  invoiceType = 'commande',
  invoiceNumber,
  clientName,
  adress,
  invoiceDate,
  products,
  soldeAnt,
  totalBon,
  vrsJour,
  soldeGlobal,
  userInfo
}) {
  const titleLabel = invoiceType === 'livraison'
    ? 'Bon de Livraison'
    : 'Bon de Commande';

  const personLabel = invoiceType === 'livraison'
    ? 'destinataire'
    : 'expéditeur';

  const productRows = products.map((product, index) => {
    const total = product.quantity * product.unitPrice;
    return `
      <tr>
        <td>${index + 1}</td>
        <td>${product.id}</td>
        <td>${product.quantity}</td>
        <td>${product.name}</td>
        <td>${product.unitPrice.toLocaleString("fr-FR", { minimumFractionDigits: 2 })}</td>
        <td>${total.toLocaleString("fr-FR", { minimumFractionDigits: 2 })}</td>
        <td>01</td>
      </tr>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>${titleLabel} N° ${invoiceNumber}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Courier New', monospace; }
    body { background-color: #f5f5f5; padding: 20px; color: #333; }
    .container { max-width: 900px; margin: 0 auto; background: white; box-shadow: 0 0 20px rgba(0,0,0,0.1); border-radius: 5px; overflow: hidden; }
    .header { background: #2c3e50; color: white; text-align: center; padding: 25px 20px; position: relative; }
    .header h1 { font-size: 28px; letter-spacing: 1px; margin-bottom: 5px; text-transform: uppercase; }
    .header::after { content: ""; position: absolute; bottom: 0; left: 5%; width: 90%; height: 2px; background: linear-gradient(90deg, transparent, #e74c3c, transparent); }
    .info-section { padding: 20px; border-bottom: 2px dashed #ddd; }
    .info-row { display: flex; margin-bottom: 10px; }
    .info-label { font-weight: bold; min-width: 120px; color: #2c3e50; }
    .info-value { flex: 1; }
    .products-table { width: 100%; border-collapse: collapse; font-size: 14px; }
    .products-table th { background: #3498db; color: white; padding: 12px 8px; text-align: left; font-weight: bold; text-transform: uppercase; }
    .products-table td { padding: 10px 8px; border-bottom: 1px solid #eee; }
    .products-table tr:nth-child(even) { background-color: #f9f9f9; }
    .products-table tr:hover { background-color: #f1f7fd; }
    .total-section { padding: 20px; background: #f8f9fa; border-top: 2px solid #ddd; }
    .total-row { display: flex; justify-content: space-between; padding: 8px 0; }
    .total-label { font-weight: bold; color: #2c3e50; }
    .total-value { font-weight: bold; color: #e74c3c; }
    .grand-total { background: #2c3e50; color: white; padding: 20px; text-align: center; font-size: 22px; font-weight: bold; }
    .footer { text-align: center; padding: 15px; color: #7f8c8d; font-size: 12px; border-top: 1px solid #eee; }
    @media print { body { background: white; padding: 0; } .container { box-shadow: none; } }
    @media (max-width: 768px) { .products-table { font-size: 12px; } .products-table th, .products-table td { padding: 8px 5px; } .header h1 { font-size: 22px; } }
    @media (max-width: 480px) { .info-row { flex-direction: column; margin-bottom: 15px; } .info-label { margin-bottom: 3px; } .products-table { display: block; overflow-x: auto; } }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${titleLabel} N° ${invoiceNumber}</h1>
    </div>
    <div class="info-section">
      <div class="info-row"><div class="info-label">Livré à :</div><div class="info-value">${clientName}</div></div>
      <div class="info-row"><div class="info-label">à l'Adresse:</div><div class="info-value">${adress}</div></div>
      <div class="info-row"><div class="info-label">Date :</div><div class="info-value">${invoiceDate}</div></div>
      <div class="info-row"><div class="info-label">Nom du ${personLabel} :</div><div class="info-value">${userInfo?.nom || ''}</div></div>
      <div class="info-row"><div class="info-label">Adresse :</div><div class="info-value">${userInfo?.address || ''}</div></div>
      <div class="info-row"><div class="info-label">Nom de business :</div><div class="info-value">${userInfo?.business || ''}</div></div>
    </div>
    <table class="products-table">
      <thead>
        <tr><th>N°</th><th>ID Produit</th><th>Quantité</th><th>Désignation</th><th>Prix Unitaire</th><th>Total</th><th>Unité</th></tr>
      </thead>
      <tbody>${productRows}</tbody>
    </table>
    <div class="total-section">
      <div class="total-row"><div class="total-label">Total Bon:</div><div class="total-value">${totalBon.toLocaleString("fr-FR",{minimumFractionDigits:2})} DA</div></div>
      <div class="total-row"><div class="total-label">Solde Antérieur:</div><div class="total-value">${soldeAnt.toLocaleString("fr-FR",{minimumFractionDigits:2})} DA</div></div>
      <div class="total-row"><div class="total-label">Versement du Jour:</div><div class="total-value">${vrsJour.toLocaleString("fr-FR",{minimumFractionDigits:2})} DA</div></div>
    </div>
    <div class="grand-total">SOLDE GLOBAL: ${soldeGlobal.toLocaleString("fr-FR",{minimumFractionDigits:2})} DA</div>
    <div class="footer">Merci pour votre confiance</div>
  </div>
</body>
</html>`;
}

/**
 * Handle print or share of invoice, with conditional type
 * @param {object} data - invoice data, including optional .type ("commande" or "livraison")
 */
export async function handlePrintInvoice(data) {
  try {
    console.log("Invoice data:", data);

    const now = new Date();
    const invoiceDate = now.toLocaleString("fr-FR");
    const invoiceNumber = Date.now();

    const invoiceType = data.type === 'livraison' ? 'livraison' : 'commande';

    const parsedProducts = data.products.map(p => ({
      id: p.id,
      name: p.name,
      quantity: Number(p.quantity) || 0,
      unitPrice: Number(p.price) || 0
    }));

    const totalBon = parsedProducts.reduce((sum, p) => sum + p.quantity * p.unitPrice, 0);
    const soldeAnt = Number(data['SOLDE ANT'] || 0);
    const vrsJour = Number(data['VRS JOUR'] || 0);
    const soldeGlobal = soldeAnt + vrsJour + totalBon;

    const userInfo = await getData("isFirstSession");

    const html = generateInvoiceHTML({
      invoiceType,
      invoiceNumber,
      clientName: data.client,
      adress: data.adresse || 'Indifini',
      invoiceDate,
      products: parsedProducts,
      soldeAnt,
      totalBon,
      vrsJour,
      soldeGlobal,
      userInfo
    });

    const { uri } = await Print.printToFileAsync({ html });
    await Sharing.shareAsync(uri);
  } catch (error) {
    console.error("Error generating invoice:", error);
    throw error;
  }
}
