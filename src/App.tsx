import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, ShoppingCart, Sparkles, AlertTriangle, Crown, Zap, Star, Heart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  category: 'luxury' | 'useless' | 'essential';
  emoji: string;
  description: string;
  priority: number;
}

interface BudgetPlan {
  products: Product[];
  totalSpent: number;
  remainingBudget: number;
  essentialsPercentage: number;
}

function App() {
  const [budget, setBudget] = useState('');
  const [budgetPlan, setBudgetPlan] = useState<BudgetPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const luxuryProducts: Product[] = [
    { id: '1', name: 'Diamond-Encrusted Phone Case', price: 2500, category: 'luxury', emoji: '💎', description: 'Because your phone deserves jewelry too', priority: 1 },
    { id: '2', name: 'Gold-Plated Toilet Paper Holder', price: 1800, category: 'luxury', emoji: '🏆', description: 'Essential for bathroom royalty', priority: 1 },
    { id: '3', name: 'Premium Air in a Jar', price: 999, category: 'useless', emoji: '🫧', description: 'Breathe like the elite', priority: 2 },
    { id: '4', name: 'RGB Gaming Chair for Cats', price: 3200, category: 'useless', emoji: '🐱', description: 'Your cat needs to game in style', priority: 1 },
    { id: '5', name: 'Bluetooth-Enabled Banana Holder', price: 750, category: 'useless', emoji: '🍌', description: 'Smart fruit storage solution', priority: 2 },
    { id: '6', name: 'Wireless Soap Dispenser', price: 1200, category: 'useless', emoji: '🧼', description: 'Because touching soap dispensers is so 2019', priority: 2 },
    { id: '7', name: 'Glow-in-the-Dark Bedsheet', price: 890, category: 'useless', emoji: '✨', description: 'Sleep like a constellation', priority: 2 },
    { id: '8', name: 'Luxury Golden Toothpicks (Pack of 5)', price: 1500, category: 'luxury', emoji: '🪙', description: 'Dental hygiene meets opulence', priority: 1 },
    { id: '9', name: 'Smart Rock (Pet Rock 2.0)', price: 650, category: 'useless', emoji: '🪨', description: 'AI-powered companionship', priority: 3 },
    { id: '10', name: 'Heated Ice Cube Tray', price: 420, category: 'useless', emoji: '🧊', description: 'For when you want warm ice', priority: 3 },
    { id: '11', name: 'Premium Invisible Ink Pen', price: 300, category: 'useless', emoji: '🖊️', description: 'Write nothing in style', priority: 3 },
    { id: '12', name: 'Solar-Powered Flashlight', price: 280, category: 'useless', emoji: '🔦', description: 'Eco-friendly darkness', priority: 3 },
    { id: '13', name: 'Underwater Umbrella', price: 550, category: 'useless', emoji: '☂️', description: 'Stay dry while swimming', priority: 3 },
    { id: '14', name: 'Levitating Plant Pot', price: 1100, category: 'luxury', emoji: '🪴', description: 'Defy gravity with your plants', priority: 1 },
    { id: '15', name: 'Crystal-Infused Water Bottle', price: 800, category: 'luxury', emoji: '💧', description: 'Hydration with mystical powers', priority: 2 },
    { id: '16', name: 'RGB Umbrella', price: 680, category: 'useless', emoji: '🌈', description: 'Light up the rain', priority: 2 },
    { id: '17', name: 'Bluetooth Coffee Mug', price: 450, category: 'useless', emoji: '☕', description: 'Your coffee needs internet too', priority: 3 },
    { id: '18', name: 'Self-Stirring Spoon', price: 320, category: 'useless', emoji: '🥄', description: 'Because stirring is exhausting', priority: 3 },
    { id: '19', name: 'Holographic Keyboard', price: 1900, category: 'luxury', emoji: '⌨️', description: 'Type in the future', priority: 1 },
    { id: '20', name: 'Magnetic Soap', price: 180, category: 'useless', emoji: '🧲', description: 'Soap that sticks around', priority: 3 }
  ];

  const essentialProducts: Product[] = [
    { id: 'e1', name: 'Rice (5kg)', price: 150, category: 'essential', emoji: '🍚', description: 'Basic sustenance (boring but necessary)', priority: 10 },
    { id: 'e2', name: 'Milk (1L)', price: 60, category: 'essential', emoji: '🥛', description: 'Calcium for your bones (yawn)', priority: 10 },
    { id: 'e3', name: 'Bread', price: 40, category: 'essential', emoji: '🍞', description: 'Carbs for survival', priority: 10 },
    { id: 'e4', name: 'Salt (1kg)', price: 25, category: 'essential', emoji: '🧂', description: 'Flavor enhancer (how mundane)', priority: 10 },
    { id: 'e5', name: 'Cooking Oil', price: 120, category: 'essential', emoji: '🫒', description: 'For cooking (revolutionary concept)', priority: 10 },
    { id: 'e6', name: 'Soap', price: 35, category: 'essential', emoji: '🧼', description: 'Personal hygiene (overrated)', priority: 10 },
    { id: 'e7', name: 'Toothpaste', price: 80, category: 'essential', emoji: '🦷', description: 'Dental care (so basic)', priority: 10 },
    { id: 'e8', name: 'Toilet Paper', price: 90, category: 'essential', emoji: '🧻', description: 'Bathroom necessity (unsexy but needed)', priority: 10 },
    { id: 'e9', name: 'Eggs (12 pack)', price: 70, category: 'essential', emoji: '🥚', description: 'Protein source (how ordinary)', priority: 10 },
    { id: 'e10', name: 'Onions (1kg)', price: 45, category: 'essential', emoji: '🧅', description: 'Makes you cry (like your budget)', priority: 10 }
  ];

  const generateBudgetPlan = () => {
    const budgetAmount = parseFloat(budget);
    if (!budgetAmount || budgetAmount <= 0) return;

    setIsGenerating(true);
    setCurrentStep(0);

    // Simulate step-by-step generation
    const steps = [
      "Analyzing your financial priorities...",
      "Identifying luxury necessities...",
      "Calculating optimal splurge ratios...",
      "Adding essentials (reluctantly)...",
      "Finalizing your perfect budget plan!"
    ];

    let stepIndex = 0;
    const stepInterval = setInterval(() => {
      setCurrentStep(stepIndex);
      stepIndex++;
      if (stepIndex >= steps.length) {
        clearInterval(stepInterval);
        generateActualPlan(budgetAmount);
      }
    }, 800);
  };

  const generateActualPlan = (budgetAmount: number) => {
    // Sort products by priority (luxury first, essentials last)
    const allProducts = [...luxuryProducts, ...essentialProducts].sort((a, b) => a.priority - b.priority);
    
    const selectedProducts: Product[] = [];
    let totalSpent = 0;

    // Add products in priority order until budget is exhausted
    for (const product of allProducts) {
      if (totalSpent + product.price <= budgetAmount) {
        selectedProducts.push(product);
        totalSpent += product.price;
      }
    }

    // If we have leftover budget, try to add more luxury items
    const remainingBudget = budgetAmount - totalSpent;
    const affordableLuxury = luxuryProducts.filter(p => 
      p.price <= remainingBudget && !selectedProducts.find(sp => sp.id === p.id)
    );

    if (affordableLuxury.length > 0) {
      const randomLuxury = affordableLuxury[Math.floor(Math.random() * affordableLuxury.length)];
      selectedProducts.splice(-3, 0, randomLuxury); // Insert before the last few essentials
      totalSpent += randomLuxury.price;
    }

    const essentialsCount = selectedProducts.filter(p => p.category === 'essential').length;
    const essentialsPercentage = (essentialsCount / selectedProducts.length) * 100;

    setBudgetPlan({
      products: selectedProducts,
      totalSpent,
      remainingBudget: budgetAmount - totalSpent,
      essentialsPercentage
    });

    setIsGenerating(false);
  };

  const getSarcasticMessage = () => {
    if (!budgetPlan) return '';
    
    const messages = [
      "Congratulations! You've mastered the art of financial irresponsibility! 🎉",
      "Your priorities are perfectly backwards - just how we like it! 💸",
      "Who needs food when you have diamond phone cases? 💎",
      "You've successfully avoided being practical. Well done! 🏆",
      "Your future self will definitely thank you for these choices! 😅",
      "Essentials are overrated anyway! Live your best life! ✨",
      "You're now qualified to teach a masterclass in poor budgeting! 📚"
    ];
    
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getPriorityBadge = (category: string, priority: number) => {
    if (category === 'luxury') {
      return <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
        <Crown className="w-3 h-3" />
        LUXURY
      </div>;
    } else if (category === 'useless') {
      return <div className="flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
        <Star className="w-3 h-3" />
        PRIORITY
      </div>;
    } else {
      return <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
        <AlertTriangle className="w-3 h-3" />
        BASIC
      </div>;
    }
  };

  const steps = [
    "Analyzing your financial priorities...",
    "Identifying luxury necessities...",
    "Calculating optimal splurge ratios...",
    "Adding essentials (reluctantly)...",
    "Finalizing your perfect budget plan!"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3">
            <div className="p-2 bg-white/20 rounded-full">
              <Calculator className="w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Budget Genius Pro™
            </h1>
            <div className="p-2 bg-white/20 rounded-full">
              <Crown className="w-8 h-8" />
            </div>
          </div>
          <p className="text-center text-amber-100 mt-2 text-lg">
            The world's most advanced financial planning tool*
          </p>
          <p className="text-center text-amber-200 text-sm mt-1">
            *Results may vary. Side effects include bankruptcy and regret.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Input Section */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200">
            <div className="text-center mb-6">
              <TrendingUp className="w-12 h-12 text-amber-600 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Enter Your Monthly Budget
              </h2>
              <p className="text-gray-600">
                Let our AI-powered algorithm optimize your spending priorities
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Budget (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="5000"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg"
                    onKeyPress={(e) => e.key === 'Enter' && generateBudgetPlan()}
                  />
                </div>
              </div>

              <button
                onClick={generateBudgetPlan}
                disabled={isGenerating || !budget}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-4 px-6 rounded-xl hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-4 focus:ring-amber-300 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5 animate-spin" />
                    {steps[currentStep]}
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Zap className="w-5 h-5" />
                    Generate My Perfect Budget Plan
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {budgetPlan && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Summary Card */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl p-6 shadow-xl">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">{getSarcasticMessage()}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-white/20 rounded-xl p-4">
                    <div className="text-2xl font-bold">₹{budgetPlan.totalSpent}</div>
                    <div className="text-amber-100">Total Spent</div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4">
                    <div className="text-2xl font-bold">₹{budgetPlan.remainingBudget}</div>
                    <div className="text-amber-100">Remaining</div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4">
                    <div className="text-2xl font-bold">{budgetPlan.essentialsPercentage.toFixed(0)}%</div>
                    <div className="text-amber-100">Essentials</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shopping List */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-amber-200">
              <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-6 border-b border-amber-200">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-6 h-6 text-amber-600" />
                  <h3 className="text-xl font-bold text-gray-800">Your Optimized Shopping List</h3>
                </div>
                <p className="text-gray-600 mt-1">Prioritized by importance (according to our advanced AI)</p>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {budgetPlan.products.map((product, index) => (
                    <div
                      key={product.id}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
                        product.category === 'essential'
                          ? 'border-gray-200 bg-gray-50'
                          : product.category === 'luxury'
                          ? 'border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50'
                          : 'border-orange-200 bg-gradient-to-r from-orange-50 to-red-50'
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{product.emoji}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-800">{product.name}</h4>
                            {getPriorityBadge(product.category, product.priority)}
                          </div>
                          <p className="text-sm text-gray-600 italic">{product.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-800">₹{product.price}</div>
                        <div className="text-sm text-gray-500">
                          {product.category === 'essential' ? 'Meh...' : 'Must have!'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Final Message */}
                <div className="mt-8 p-6 bg-gradient-to-r from-red-100 to-pink-100 rounded-xl border border-red-200">
                  <div className="text-center">
                    <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                    <h4 className="text-lg font-bold text-red-800 mb-2">
                      Financial Advisory Notice
                    </h4>
                    <p className="text-red-700">
                      Congratulations! You've successfully prioritized wants over needs. 
                      Your bank account may not thank you, but your RGB umbrella will light up your life! ✨
                    </p>
                    <p className="text-sm text-red-600 mt-2 italic">
                      *This app is for entertainment purposes only. Please don't actually follow this advice.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-gray-600 text-sm">
            Made with <Heart className="w-4 h-4 inline text-red-500" /> at the Useless Project Makeathon
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Disclaimer: This app promotes terrible financial decisions. Use at your own risk!
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;