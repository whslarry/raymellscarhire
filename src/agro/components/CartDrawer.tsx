import React from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../lib/cart';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { items, count, total, isOpen, closeCart, removeFromCart, updateQuantity } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[70] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-emerald-900" />
            <h2 className="font-bold text-gray-900 text-lg">Your Cart</h2>
            <span className="bg-emerald-900 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {count}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4" style={{ maxHeight: 'calc(100vh - 220px)' }}>
          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="h-12 w-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-500 font-semibold">Your cart is empty</p>
              <p className="text-gray-400 text-sm mt-1">Add some fresh vegetables to get started.</p>
              <button
                onClick={closeCart}
                className="mt-6 text-emerald-900 font-medium text-sm hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.vegetable.id} className="flex gap-4 p-3 bg-gray-50 rounded-xl">
                  <img
                    src={item.vegetable.image_url}
                    alt={item.vegetable.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 truncate">{item.vegetable.name}</h4>
                    <p className="text-emerald-900 font-bold text-sm">${item.vegetable.price_per_kg.toFixed(2)}/{item.vegetable.unit}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.vegetable.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-sm font-bold text-gray-900 w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.vegetable.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeFromCart(item.vegetable.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                      aria-label={`Remove ${item.vegetable.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <p className="text-gray-900 font-bold text-sm">
                      ${(item.vegetable.price_per_kg * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm">Subtotal</span>
              <span className="text-gray-900 font-bold text-lg">${total.toFixed(2)}</span>
            </div>
            <p className="text-gray-400 text-xs">Shipping calculated at checkout.</p>
            <Link
              to="/shop"
              onClick={closeCart}
              className="w-full flex items-center justify-center gap-2 bg-emerald-900 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl transition-colors"
            >
              Checkout
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              onClick={closeCart}
              className="w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
