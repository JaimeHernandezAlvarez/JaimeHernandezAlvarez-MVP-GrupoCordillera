import React from 'react';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="w-full min-h-screen bg-[#f4f7fc] flex flex-col justify-center items-center p-4 font-sans relative box-border">
      
      {/* Tarjeta Blanca del Login */}
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 w-full max-w-md z-10 mb-6">
        
        {/* Header del Login */}
        <div className="text-center mb-4">
          <img 
            src="/logo-grupo-cordillera.png" 
            alt="Grupo Cordillera" 
            className="w-48 mx-auto h-auto object-contain -mt-4 -mb-2" /* <-- Ajustado: w-48 reduce el tamaño total, -mt-4 y -mb-2 eliminan el espacio vacío vertical */
          />
          <h2 className="text-lg font-bold text-gray-800 tracking-tight">
            Sistema de Monitoreo del Desempeño
          </h2>
          <p className="text-xs text-gray-400 mt-1 uppercase font-semibold tracking-wider">
            Portal Corporativo de Acceso Restringido
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-5">
          {/* Campo Usuario */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
              Usuario o Correo
            </label>
            <input 
              type="text" 
              placeholder="Ingrese su credencial" 
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-800 focus:bg-white transition-colors"
              required
            />
          </div>

          {/* Campo Contraseña */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Contraseña
              </label>
              <a href="#" className="text-xs text-blue-800 font-medium hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-800 focus:bg-white transition-colors"
              required
            />
          </div>

          {/* Botón de Entrada */}
          <button 
            type="submit" 
            className="w-full py-2.5 bg-blue-900 text-white font-semibold text-sm rounded shadow-xs hover:bg-blue-950 transition-colors cursor-pointer mt-2"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>

      {/* Recuadro Celeste Exclusivo para la Nota de Roles */}
      <div className="bg-[#eff6ff] border border-[#bfdbfe] px-4 py-3 rounded-lg flex items-start gap-3 text-xs text-blue-800 max-w-md w-full mb-16 shadow-xs">
        {/* Icono Informativo (i) */}
        <div className="bg-blue-100 text-blue-600 w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
          i
        </div>
        <div>
          <span className="font-bold text-blue-900 block mb-0.5">Nota de Desarrollo:</span>
          El sistema cuenta con roles (Admin, Gerente, Usuario). La vista de Admin es la que se muestra aquí.
        </div>
      </div>

      {/* Footer del Login - Solo con el Copyright abajo del todo */}
      <footer className="fixed bottom-0 left-0 w-full py-6 bg-transparent text-center text-[11px] text-gray-600 font-medium px-4">
        © 2026 Grupo Cordillera. Todos los derechos reservados.
      </footer>
    </div>
  );
};