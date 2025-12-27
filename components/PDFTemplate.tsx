
import React from 'react';
import { Quote, BusinessProfile } from '../types';

interface PDFTemplateProps {
  quote: Quote;
  business: BusinessProfile;
}

export const PDFTemplate: React.FC<PDFTemplateProps> = ({ quote, business }) => {
  return (
    <div
      id="pdf-render-target"
      className="p-8 bg-white text-slate-900"
      style={{ width: '800px', height: 'auto', paddingBottom: '100px' }}
    >
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-orange-500 pb-6 mb-6">
        <div className="flex gap-4 items-center">
          {business.logo ? (
            <img src={business.logo} alt="Logo" className="w-24 h-24 object-contain rounded-lg shadow-sm" />
          ) : (
            <div className="w-24 h-24 bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-2xl rounded-lg">
              {business.companyName?.charAt(0) || 'S'}
            </div>
          )}
          <div>
            <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tight">
              {business.companyName || 'Serralheria Pro'}
            </h1>
            <p className="text-slate-500 text-sm font-medium">{business.ownerName}</p>
            <p className="text-slate-500 text-sm">
              {business.phone} | {business.email}
            </p>
            <p className="text-slate-400 text-xs mt-1 italic">{business.address}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-slate-500 font-medium">Data: {quote.date}</p>
        </div>
      </div>

      {/* Client Info */}
      <div className="bg-slate-50 p-4 rounded-xl mb-6 grid grid-cols-2 gap-4 border border-slate-100">
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Cliente</h3>
          <p className="font-bold text-slate-800 text-lg">{quote.clientName}</p>
          <p className="text-slate-600">{quote.clientPhone}</p>
        </div>
        <div className="text-right">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Local da Obra</h3>
          <p className="text-slate-600">{quote.clientAddress || 'Endereço não informado'}</p>
        </div>
      </div>

      {/* Items Table */}
      <table className="w-full mb-8">
        <thead>
          <tr className="bg-slate-800 text-white text-left text-xs uppercase tracking-wider">
            <th className="p-3 rounded-tl-lg">Item / Material</th>
            <th className="p-3">Dimensões</th>
            <th className="p-3 text-center rounded-tr-lg">Qtd</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {quote.items.map((item) => (
            <tr key={item.id} className="text-sm">
              <td className="p-3">
                <div className="font-bold text-slate-800">{item.name}</div>
                <div className="text-xs text-slate-500 font-medium">
                  {item.material} - {item.description}
                </div>
              </td>
              <td className="p-3 text-slate-600">
                {item.width}m x {item.height}m
              </td>
              <td className="p-3 text-center text-slate-600 font-medium">{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals and Photos */}
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b pb-1">
            Fotos do Projeto
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {quote.items.filter((i) => i.image).map((item, idx) => (
              <div
                key={idx}
                className="aspect-square bg-slate-100 rounded-lg overflow-hidden border border-slate-200"
              >
                <img src={item.image} className="w-full h-full object-cover" alt={`Item ${idx}`} />
              </div>
            ))}
            {quote.items.filter((i) => i.image).length === 0 && (
              <p className="text-xs text-slate-400 italic">Nenhuma foto anexada</p>
            )}
          </div>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl h-fit">
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <span className="font-bold text-orange-400 uppercase text-xs">Valor Tota:</span>
              <span className="text-2xl font-black">
                R$ {quote.total ? quote.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '0,00'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-12 pt-8 border-t border-slate-100 text-center">
        <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Obrigado pela preferência!</p>
        <p className="text-[10px] text-slate-300 mt-1">
          Este documento é um registro de orçamento para fins informativos.
        </p>
      </div>
    </div>
  );
};
