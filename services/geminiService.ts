
import { GoogleGenAI } from "@google/genai";
import { Quote } from "../types";

// Fix: Always initialize GoogleGenAI with process.env.API_KEY directly as required by guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeBudget = async (quote: Quote): Promise<string> => {
  if (!process.env.API_KEY) return "Erro: Chave de API não configurada.";

  const prompt = `
    Atue como um mestre serralheiro experiente. Analise este orçamento e forneça dicas técnicas, 
    verificação de possíveis custos ocultos (solda, pintura, transporte) e sugestões de melhoria.

    Cliente: ${quote.clientName}
    Data: ${quote.date}
    
    Itens:
    ${quote.items.map(item => `- ${item.name}: ${item.width}m x ${item.height}m (${item.quantity} unidades) em ${item.material}. Descrição: ${item.description}`).join('\n')}
    
    Custos:
    Mão de Obra: R$ ${quote.laborCost.toFixed(2)}
    Total Estimado: R$ ${quote.total.toFixed(2)}

    Forneça uma análise curta, profissional e em português brasileiro, destacando:
    1. Complexidade do projeto.
    2. Sugestão de ferragens ou acessórios necessários.
    3. Alerta de possíveis dificuldades técnicas.
  `;

  try {
    // Fix: Call generateContent directly on ai.models with the specified model and contents string
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    // Fix: Access response.text as a property, ensuring it's not treated as a method call
    return response.text || "Não foi possível gerar análise no momento.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Erro ao processar análise inteligente.";
  }
};
