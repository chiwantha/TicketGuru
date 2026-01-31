"use client";

import { useState, useRef, useEffect } from "react";
import Button from "../button/button/Button";
import { ticket_btn_ui } from "@/constant/styles";

const TicketModal = ({ tt_id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef(null);

  const hasTicket = Boolean(tt_id);

  // Build the Ticket Tailor checkout URL
  const ticketUrl = hasTicket
    ? `https://www.tickettailor.com/checkout/new-session/id/${tt_id}/chk/54e7/?ref=dsa&show_search_filter=true&show_date_filter=true&show_sort=true`
    : null;

  useEffect(() => {
    if (!isOpen || !hasTicket || !widgetRef.current) return;

    // Prevent duplicate script injection
    if (widgetRef.current.querySelector("script")) return;

    const script = document.createElement("script");
    script.src = "https://cdn.tickettailor.com/js/widgets/min/widget.js";
    script.async = true;

    script.setAttribute("data-url", ticketUrl);
    script.setAttribute("data-type", "inline");
    script.setAttribute("data-inline-minimal", "true");
    script.setAttribute("data-inline-show-logo", "false");
    script.setAttribute("data-inline-bg-fill", "false");
    script.setAttribute("data-inline-inherit-ref-from-url-param", "");
    script.setAttribute("data-inline-ref", "dsa");

    widgetRef.current.appendChild(script);
  }, [isOpen, hasTicket, ticketUrl]);

  return (
    <>
      <Button
        title={hasTicket ? "Buy Tickets" : "Tickets Unavailable"}
        onClick={() => setIsOpen(true)}
        wfull
        pd="py-6 px-4"
        fg="text-xl uppercase"
        bg={ticket_btn_ui}
      />

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-full max-w-lg rounded-lg bg-white p-6">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-3 top-3 text-xl text-gray-600 hover:text-black"
            >
              ✕
            </button>

            {hasTicket ? (
              <div className="tt-widget" ref={widgetRef}>
                <div className="tt-widget-fallback">
                  <p>
                    <a href={ticketUrl} target="_blank" rel="noreferrer">
                      Click here to buy tickets
                    </a>
                    <br />
                    <small>
                      <a
                        href="https://www.tickettailor.com?rf=wdg_285205"
                        className="tt-widget-powered"
                      >
                        Sell tickets online with Ticket Tailor
                      </a>
                    </small>
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-16 text-center">
                <h3 className="text-xl font-semibold">
                  🎟 Tickets Unavailable
                </h3>
                <p className="mt-2 text-gray-600">
                  This event is not available for booking.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TicketModal;
