import React, { useState } from 'react';
import { Calculator, TrendingUp, Users, Heart, BarChart3, AlertCircle } from 'lucide-react';

const TherapistMetricsCalculator = () => {
  const [activeTab, setActiveTab] = useState('clv');
  const [results, setResults] = useState({});

  // CLV Calculator
  const [clvData, setClvData] = useState({
    prezzoMedioVisita: '',
    numeroVisite: '',
    durataMesi: ''
  });

  // Churn Rate Calculator
  const [churnData, setChurnData] = useState({
    clientiIniziali: '',
    clientiPersi: ''
  });

  // NPS Calculator
  const [npsData, setNpsData] = useState({
    promotori: '',
    passivi: '',
    insoddisfatti: ''
  });

  // Return Rate Calculator
  const [returnData, setReturnData] = useState({
    visiteTotali: '',
    visiteRitorno: ''
  });

  const calculateCLV = () => {
    const { prezzoMedioVisita, numeroVisite, durataMesi } = clvData;
    if (prezzoMedioVisita && numeroVisite) {
      const clvBase = parseFloat(prezzoMedioVisita) * parseFloat(numeroVisite);
      const clvMensile = durataMesi ? clvBase * parseFloat(durataMesi) : clvBase;
      setResults(prev => ({ 
        ...prev, 
        clv: clvBase.toFixed(2),
        clvMensile: durataMesi ? clvMensile.toFixed(2) : null
      }));
    }
  };

  const calculateChurnRate = () => {
    const { clientiIniziali, clientiPersi } = churnData;
    if (clientiIniziali && clientiPersi) {
      const rate = (parseFloat(clientiPersi) / parseFloat(clientiIniziali)) * 100;
      setResults(prev => ({ ...prev, churnRate: rate.toFixed(2) }));
    }
  };

  const calculateNPS = () => {
    const { promotori, passivi, insoddisfatti } = npsData;
    if (promotori && passivi && insoddisfatti) {
      const totale = parseFloat(promotori) + parseFloat(passivi) + parseFloat(insoddisfatti);
      const percPromotori = (parseFloat(promotori) / totale) * 100;
      const percInsoddisfatti = (parseFloat(insoddisfatti) / totale) * 100;
      const nps = percPromotori - percInsoddisfatti;
      setResults(prev => ({ ...prev, nps: nps.toFixed(1) }));
    }
  };

  const calculateReturnRate = () => {
    const { visiteTotali, visiteRitorno } = returnData;
    if (visiteTotali && visiteRitorno) {
      const rate = (parseFloat(visiteRitorno) / parseFloat(visiteTotali)) * 100;
      setResults(prev => ({ ...prev, returnRate: rate.toFixed(2) }));
    }
  };

  const getInterpretation = (metric, value) => {
    switch (metric) {
      case 'churnRate':
        if (value < 5) return { color: 'text-green-600', text: 'Eccellente - Basso tasso di abbandono' };
        if (value < 10) return { color: 'text-yellow-600', text: 'Buono - Nella media' };
        return { color: 'text-red-600', text: 'Attenzione - Alto tasso di abbandono' };
      case 'nps':
        if (value > 50) return { color: 'text-green-600', text: 'Eccellente - Clienti molto soddisfatti' };
        if (value > 0) return { color: 'text-yellow-600', text: 'Buono - Da migliorare' };
        return { color: 'text-red-600', text: 'Critico - Necessario intervento immediato' };
      case 'returnRate':
        if (value > 70) return { color: 'text-green-600', text: 'Eccellente - Alta fidelizzazione' };
        if (value > 40) return { color: 'text-yellow-600', text: 'Buono - Margine di miglioramento' };
        return { color: 'text-red-600', text: 'Attenzione - Bassa fidelizzazione' };
      default:
        return { color: 'text-blue-600', text: 'Valore calcolato' };
    }
  };

  const tabs = [
    { id: 'clv', name: 'CLV', icon: BarChart3, color: 'bg-green-500' },
    { id: 'churn', name: 'Churn Rate', icon: TrendingUp, color: 'bg-red-500' },
    { id: 'return', name: 'Tasso Ritorno', icon: Users, color: 'bg-purple-500' },
    { id: 'nps', name: 'NPS', icon: Heart, color: 'bg-blue-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Calcolatore Metriche Terapista</h1>
          </div>
          <p className="text-gray-600">Monitora le performance del tuo studio con metriche professionali</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center mb-8 bg-white rounded-lg shadow-md p-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 m-1 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? `${tab.color} text-white shadow-lg`
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Calculator Cards */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* CLV */}
          {activeTab === 'clv' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <BarChart3 className="w-6 h-6 mr-2 text-green-500" />
                Customer Lifetime Value (CLV)
              </h2>
              <p className="text-gray-600 mb-6">Valore totale che un cliente porta alla tua attività durante la relazione</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prezzo medio per visita (€)
                    </label>
                    <input
                      type="number"
                      value={clvData.prezzoMedioVisita}
                      onChange={(e) => setClvData({...clvData, prezzoMedioVisita: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="es. 50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Numero medio di visite per cliente
                    </label>
                    <input
                      type="number"
                      value={clvData.numeroVisite}
                      onChange={(e) => setClvData({...clvData, numeroVisite: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="es. 5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Durata relazione in mesi (opzionale)
                    </label>
                    <input
                      type="number"
                      value={clvData.durataMesi}
                      onChange={(e) => setClvData({...clvData, durataMesi: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="es. 12"
                    />
                    <p className="text-xs text-gray-500 mt-1">Inserisci per calcolare il CLV su più mesi</p>
                  </div>
                  <button
                    onClick={calculateCLV}
                    className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Calcola CLV
                  </button>
                </div>
                
                {results.clv && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Risultato:</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">CLV Base per cliente:</p>
                        <div className="text-2xl font-bold text-green-500">€{results.clv}</div>
                      </div>
                      {results.clvMensile && (
                        <div>
                          <p className="text-sm text-gray-600">CLV su durata relazione:</p>
                          <div className="text-2xl font-bold text-green-600">€{results.clvMensile}</div>
                        </div>
                      )}
                    </div>
                    <div className="text-green-600 font-medium mt-2">
                      Valore per cliente calcolato
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      <AlertCircle className="w-4 h-4 inline mr-1" />
                      Formula: Prezzo medio × Numero visite {results.clvMensile && '× Durata mesi'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Churn Rate */}
          {activeTab === 'churn' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-red-500" />
                Churn Rate (Tasso di Abbandono)
              </h2>
              <p className="text-gray-600 mb-6">Percentuale di clienti che smettono di utilizzare i tuoi servizi</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Clienti all'inizio del mese
                    </label>
                    <input
                      type="number"
                      value={churnData.clientiIniziali}
                      onChange={(e) => setChurnData({...churnData, clientiIniziali: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="es. 100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Clienti persi nel mese
                    </label>
                    <input
                      type="number"
                      value={churnData.clientiPersi}
                      onChange={(e) => setChurnData({...churnData, clientiPersi: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="es. 5"
                    />
                  </div>
                  <button
                    onClick={calculateChurnRate}
                    className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Calcola Churn Rate
                  </button>
                </div>
                
                {results.churnRate && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Risultato:</h3>
                    <div className="text-3xl font-bold text-red-500 mb-2">{results.churnRate}%</div>
                    <div className={`${getInterpretation('churnRate', parseFloat(results.churnRate)).color} font-medium`}>
                      {getInterpretation('churnRate', parseFloat(results.churnRate)).text}
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      <AlertCircle className="w-4 h-4 inline mr-1" />
                      Formula: (Clienti persi / Clienti iniziali) × 100
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Return Rate */}
          {activeTab === 'return' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Users className="w-6 h-6 mr-2 text-purple-500" />
                Tasso di Ritorno dei Pazienti
              </h2>
              <p className="text-gray-600 mb-6">Percentuale di clienti che tornano dopo la prima visita</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Visite totali nel mese
                    </label>
                    <input
                      type="number"
                      value={returnData.visiteTotali}
                      onChange={(e) => setReturnData({...returnData, visiteTotali: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="es. 200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Visite di ritorno nel mese
                    </label>
                    <input
                      type="number"
                      value={returnData.visiteRitorno}
                      onChange={(e) => setReturnData({...returnData, visiteRitorno: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="es. 50"
                    />
                  </div>
                  <button
                    onClick={calculateReturnRate}
                    className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    Calcola Tasso di Ritorno
                  </button>
                </div>
                
                {results.returnRate && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Risultato:</h3>
                    <div className="text-3xl font-bold text-purple-500 mb-2">{results.returnRate}%</div>
                    <div className={`${getInterpretation('returnRate', parseFloat(results.returnRate)).color} font-medium`}>
                      {getInterpretation('returnRate', parseFloat(results.returnRate)).text}
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      <AlertCircle className="w-4 h-4 inline mr-1" />
                      Formula: (Visite di ritorno / Visite totali) × 100
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* NPS */}
          {activeTab === 'nps' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Heart className="w-6 h-6 mr-2 text-blue-500" />
                Net Promoter Score (NPS)
              </h2>
              <p className="text-gray-600 mb-6">Misura la probabilità che i clienti raccomandino i tuoi servizi</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-50 p-3 rounded-lg mb-4">
                    <p className="text-sm text-blue-800">
                      <strong>Promotori:</strong> Voti 9-10 | <strong>Passivi:</strong> Voti 7-8 | <strong>Insoddisfatti:</strong> Voti 0-6
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Numero Promotori (9-10)
                    </label>
                    <input
                      type="number"
                      value={npsData.promotori}
                      onChange={(e) => setNpsData({...npsData, promotori: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="es. 60"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Numero Passivi (7-8)
                    </label>
                    <input
                      type="number"
                      value={npsData.passivi}
                      onChange={(e) => setNpsData({...npsData, passivi: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="es. 30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Numero Insoddisfatti (0-6)
                    </label>
                    <input
                      type="number"
                      value={npsData.insoddisfatti}
                      onChange={(e) => setNpsData({...npsData, insoddisfatti: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="es. 10"
                    />
                  </div>
                  <button
                    onClick={calculateNPS}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Calcola NPS
                  </button>
                </div>
                
                {results.nps && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Risultato:</h3>
                    <div className="text-3xl font-bold text-blue-500 mb-2">{results.nps}</div>
                    <div className={`${getInterpretation('nps', parseFloat(results.nps)).color} font-medium`}>
                      {getInterpretation('nps', parseFloat(results.nps)).text}
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      <AlertCircle className="w-4 h-4 inline mr-1" />
                      Formula: % Promotori - % Insoddisfatti
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Suggerimenti per Migliorare</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2">Churn Rate Alto?</h4>
              <p className="text-red-700 text-sm">Implementa un programma di follow-up post-visita per comprendere e risolvere problemi.</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Aumentare il CLV</h4>
              <p className="text-green-700 text-sm">Offri pacchetti di trattamento a lungo termine con incentivi.</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">NPS Basso?</h4>
              <p className="text-blue-700 text-sm">Affronta le preoccupazioni dei clienti insoddisfatti per migliorare i servizi.</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">Tasso Ritorno Basso?</h4>
              <p className="text-purple-700 text-sm">Offri promozioni per visite successive e migliora l'empatia con il cliente.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistMetricsCalculator;
