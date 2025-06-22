import React from 'react';
import { Button, View } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import Home from './screens/Home';

export default function App() {
  const createAndSharePDF = async () => {
    const htmlContent = `
      <!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bon de Conhande N° 321</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Courier New', monospace;
        }
        
        body {
            background-color: #f5f5f5;
            padding: 20px;
            color: #333;
        }
        
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            border-radius: 5px;
            overflow: hidden;
        }
        
        .header {
            background: #2c3e50;
            color: white;
            text-align: center;
            padding: 25px 20px;
            position: relative;
        }
        
        .header h1 {
            font-size: 28px;
            letter-spacing: 1px;
            margin-bottom: 5px;
            text-transform: uppercase;
        }
        
        .header::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 5%;
            width: 90%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #e74c3c, transparent);
        }
        
        .info-section {
            padding: 20px;
            border-bottom: 2px dashed #ddd;
        }
        
        .info-row {
            display: flex;
            margin-bottom: 10px;
        }
        
        .info-label {
            font-weight: bold;
            min-width: 120px;
            color: #2c3e50;
        }
        
        .info-value {
            flex: 1;
        }
        
        .products-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 14px;
        }
        
        .products-table th {
            background: #3498db;
            color: white;
            padding: 12px 8px;
            text-align: left;
            font-weight: bold;
            text-transform: uppercase;
        }
        
        .products-table td {
            padding: 10px 8px;
            border-bottom: 1px solid #eee;
        }
        
        .products-table tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        
        .products-table tr:hover {
            background-color: #f1f7fd;
        }
        
        .total-section {
            padding: 20px;
            background: #f8f9fa;
            border-top: 2px solid #ddd;
        }
        
        .total-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
        }
        
        .total-label {
            font-weight: bold;
            color: #2c3e50;
        }
        
        .total-value {
            font-weight: bold;
            color: #e74c3c;
        }
        
        .grand-total {
            background: #2c3e50;
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 22px;
            font-weight: bold;
        }
        
        .footer {
            text-align: center;
            padding: 15px;
            color: #7f8c8d;
            font-size: 12px;
            border-top: 1px solid #eee;
        }
        
        @media print {
            body {
                background: white;
                padding: 0;
            }
            
            .container {
                box-shadow: none;
            }
        }
        
        @media (max-width: 768px) {
            .products-table {
                font-size: 12px;
            }
            
            .products-table th,
            .products-table td {
                padding: 8px 5px;
            }
            
            .header h1 {
                font-size: 22px;
            }
        }
        
        @media (max-width: 480px) {
            .info-row {
                flex-direction: column;
                margin-bottom: 15px;
            }
            
            .info-label {
                margin-bottom: 3px;
            }
            
            .products-table {
                display: block;
                overflow-x: auto;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Bon de Conhande N° 321</h1>
        </div>
        
        <div class="info-section">
            <div class="info-row">
                <div class="info-label">Livré à :</div>
                <div class="info-value">NHLIFA DEPO 32</div>
            </div>
            <div class="info-row">
                <div class="info-label">Date :</div>
                <div class="info-value">24/05/2025 11:43:02</div>
            </div>
        </div>
        
        <table class="products-table">
            <thead>
                <tr>
                    <th>N°</th>
                    <th>N° PRODUIT</th>
                    <th>QTE</th>
                    <th>DESIGNATION</th>
                    <th>PRIX_UNIT</th>
                    <th>PL TOTAL</th>
                    <th>DBS</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>159</td>
                    <td>65</td>
                    <td>BRONZI AMARDE</td>
                    <td>2 250.00</td>
                    <td>116 350.00</td>
                    <td>01</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>195</td>
                    <td>50</td>
                    <td>BRONZI CACAOUTE BLANC LONG</td>
                    <td>4 600.00</td>
                    <td>200 000.00</td>
                    <td>01</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>160</td>
                    <td>70</td>
                    <td>BRONZI CACAOUTE COQUE SKG</td>
                    <td>1 300.00</td>
                    <td>91 000.00</td>
                    <td>01</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>156</td>
                    <td>37</td>
                    <td>BRONZI CACAOUTE FUNEE 2,5 KG</td>
                    <td>1 600.00</td>
                    <td>59 200.00</td>
                    <td>01</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>219</td>
                    <td>30</td>
                    <td>BRONZI CACAOUTE ROUGEIDKG</td>
                    <td>1 300.00</td>
                    <td>90 000.00</td>
                    <td>01</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>153</td>
                    <td>70</td>
                    <td>BRONZI GRAINE VERT JKG</td>
                    <td>1 220.00</td>
                    <td>96 900.00</td>
                    <td>01</td>
                </tr>
                <tr>
                    <td>7</td>
                    <td>153</td>
                    <td>75</td>
                    <td>BRONZI HELANGE</td>
                    <td>2 600.00</td>
                    <td>150 000.00</td>
                    <td>01</td>
                </tr>
                <tr>
                    <td>8</td>
                    <td>154</td>
                    <td>35</td>
                    <td>BRONZI NOIX</td>
                    <td>1 360.00</td>
                    <td>48 500.00</td>
                    <td>01</td>
                </tr>
                <tr>
                    <td>9</td>
                    <td>157</td>
                    <td>80</td>
                    <td>BRONZI NOIX CE CAJOUR</td>
                    <td>1 200.00</td>
                    <td>118 000.00</td>
                    <td>01</td>
                </tr>
                <tr>
                    <td>10</td>
                    <td>152</td>
                    <td>80</td>
                    <td>BRONZI PEZACHE JKG</td>
                    <td>2 350.00</td>
                    <td>108 000.00</td>
                    <td>01</td>
                </tr>
                <tr>
                    <td>11</td>
                    <td>166</td>
                    <td>60</td>
                    <td>BRONZI REZ BASHATI ZEN WBAC LONG</td>
                    <td>1 700.00</td>
                    <td>102 000.00</td>
                    <td>01</td>
                </tr>
                <tr>
                    <td>12</td>
                    <td>64</td>
                    <td>80</td>
                    <td>BRONZI REZ ETIVE LIGY-10</td>
                    <td>1 180.00</td>
                    <td>91 400.00</td>
                    <td>01</td>
                </tr>
                <tr>
                    <td>13</td>
                    <td>65</td>
                    <td>70</td>
                    <td>BRONZI REZ ETIVE SOOGY-20</td>
                    <td>1 100.00</td>
                    <td>82 600.00</td>
                    <td>01</td>
                </tr>
                <tr>
                    <td>14</td>
                    <td>162</td>
                    <td>80</td>
                    <td>BRONZI REZ ETIVE VINCEIDKG</td>
                    <td>1 080.00</td>
                    <td>86 400.00</td>
                    <td>01</td>
                </tr>
                <tr>
                    <td>15</td>
                    <td>218</td>
                    <td>100</td>
                    <td>CACAOUTE HES ANIS SKG</td>
                    <td>1 550.00</td>
                    <td>155 000.00</td>
                    <td>01</td>
                </tr>
                <tr>
                    <td>16</td>
                    <td>202</td>
                    <td>50</td>
                    <td>CAFE HAWY 250G</td>
                    <td>4 600.00</td>
                    <td>230 000.00</td>
                    <td>01</td>
                </tr>
                <tr>
                    <td>17</td>
                    <td>217</td>
                    <td>264</td>
                    <td>DIQUI MINA MELSLOUPA</td>
                    <td>1 600.00</td>
                    <td>158 400.00</td>
                    <td>01</td>
                </tr>
                <tr>
                    <td>18</td>
                    <td>209</td>
                    <td>50</td>
                    <td>ZERIAA 2,5 KG NOIR</td>
                    <td>2 250.00</td>
                    <td>62 500.00</td>
                    <td>01</td>
                </tr>
            </tbody>
        </table>
        
        <div class="total-section">
            <div class="total-row">
                <div class="total-label">SOLDE ANT.</div>
                <div class="total-value">2 512 060.00</div>
            </div>
            <div class="total-row">
                <div class="total-label">TOTAL BONS</div>
                <div class="total-value">2 175 950.00</div>
            </div>
            <div class="total-row">
                <div class="total-label">VRS JOUR</div>
                <div class="total-value">9 718 010.00</div>
            </div>
            <div class="total-row">
                <div class="total-label">SOLDE AU DATE : 24/05/2025</div>
                <div class="total-value">9 718 010.00</div>
            </div>
        </div>
        
        <div class="grand-total">
            SOLDE GLE: 9 718 010.00
        </div>
        
        <div class="footer">
            Document généré le 24/05/2025 - Bon de Conhande N° 321
        </div>
    </div>
</body>
</html>
    `;

    const { uri } = await Print.printToFileAsync({
      html: htmlContent,
    });

    console.log('PDF generated at:', uri);

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri);
    } else {
      alert('Sharing not available');
    }
  };

  return (
    <View style={{ marginTop: 50 }}>
      <Home />
    </View>
  );
}
