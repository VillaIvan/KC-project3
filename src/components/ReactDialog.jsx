"use client";

import { AstroDialog, AstroDialogTrigger } from "./AstroDialog2";
import { useCallback } from "react";

export default function DialogWrapper() {
  // Podés usar esta función para cerrar el diálogo desde el componente
  const handleClose = useCallback(() => {
    // manejar algo si querés cuando se cierra el diálogo
  }, []);

  return (
    <div className="dialog-container">
      <AstroDialogTrigger
        dialogId="quote-dialog"
        className="flex items-center bg-white text-black hover:bg-background hover:text-white text-xl py-4 border border-gray-400"
      >
        Habla con un asesor
      </AstroDialogTrigger>

      <AstroDialog
        id="quote-dialog"
        isOpen={false}
        onClose={handleClose}
        title="Dejanos tu consulta"
        description="Llena el formulario y nos pondremos en contacto contigo a la brevedad."
      >
        <form className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium" htmlFor="first-name">
                Nombre:
              </label>
              <input
                id="first-name"
                className="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                placeholder="Ingrese su nombre"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium" htmlFor="last-name">
                Apellido:
              </label>
              <input
                id="last-name"
                className="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                placeholder="Ingrese su apellido"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium" htmlFor="email">
                Email:
              </label>
              <input
                id="email"
                type="email"
                className="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                placeholder="Ingrese su email"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium" htmlFor="telephone">
                Teléfono:
              </label>
              <input
                id="telephone"
                type="tel"
                className="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                placeholder="Ingrese su teléfono"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium" htmlFor="city">
                Localidad:
              </label>
              <input
                id="city"
                className="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                placeholder="Ingrese su localidad"
                required
              />
            </div>
            <div className="space-y-2">
              <label
                className="block text-sm font-medium"
                htmlFor="insurance-type"
              >
                Motivo:
              </label>
              <select
                id="insurance-type"
                className="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                required
              >
                <option value="">--Elija una opción--</option>
                <option value="cotizar">Cotizar</option>
                <option value="consulta">Consulta</option>
                <option value="productores">Productores</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium" htmlFor="description">
              ¿Cómo podemos ayudarte?
            </label>
            <textarea
              id="description"
              className="w-full min-h-[100px] rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 resize-y"
              placeholder="Contanos qué tipo de seguro necesitas."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-background/80 py-2 px-4 font-medium text-white hover:bg-background"
          >
            Enviar
          </button>
        </form>
      </AstroDialog>
    </div>
  );
}
