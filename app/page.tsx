"use client";

import { useMemo, useState } from "react";

type LiveMode = "presentiel" | "distance";
type ClientDetails = {
  name: string;
  phone: string;
  email: string;
  country: string;
  city: string;
  business: string;
};
type BusinessDetails = {
  activity: string;
  products: string;
  featuredProduct: string;
  goal: string;
  audience: string;
  socialLinks: string;
};

const packages = [
  {
    name: "Découverte",
    duration: "1 h 30",
    price: 20000,
    description: "Une première expérience pour présenter votre produit en direct.",
    features: ["Présentation de votre produit", "Accompagnement pendant le live"],
  },
  {
    name: "Standard",
    duration: "2 h",
    price: null,
    description: "Un format idéal pour faire connaître votre activité.",
    features: ["Présentation et animation", "Assistance pendant le live"],
  },
  {
    name: "Business",
    duration: "4 h",
    price: null,
    description: "Plus de temps pour présenter, échanger et vendre.",
    features: ["Accompagnement commercial", "Promotion renforcée"],
    featured: true,
  },
  {
    name: "Premium",
    duration: "6 h",
    price: null,
    description: "Un live prolongé pour mettre vos produits en lumière.",
    features: ["Animation dédiée", "Mise en avant de vos produits"],
  },
  {
    name: "VIP",
    duration: "1 journée",
    price: null,
    description: "Une journée entière consacrée à votre marque.",
    features: ["Accompagnement renforcé", "Promotion commerciale"],
  },
  {
    name: "Partenaire",
    duration: "1 mois",
    price: null,
    description: "Un rendez-vous régulier pour développer votre audience.",
    features: ["Plusieurs sessions de live", "Accompagnement régulier"],
  },
] as const;

const timeSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00"];
const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const monthNames = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];
const initialClientDetails: ClientDetails = {
  name: "",
  phone: "",
  email: "",
  country: "",
  city: "",
  business: "",
};
const initialBusinessDetails: BusinessDetails = {
  activity: "",
  products: "",
  featuredProduct: "",
  goal: "",
  audience: "",
  socialLinks: "",
};

function ArrowRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M3.5 10h13m0 0-5-5m5 5-5 5" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7.5" />
      <path d="M10 5.5V10l3 2" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <rect x="2.75" y="4.25" width="14.5" height="13" rx="2" />
      <path d="M6.5 2.75v3m7-3v3m-10.75 3h14.5" />
    </svg>
  );
}

function formatPrice(price: number | null) {
  return price === null
    ? "Sur devis"
    : `${new Intl.NumberFormat("fr-FR").format(price)} FCFA`;
}

function formatLongDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function AppHeader() {
  return (
    <header className="site-header">
      <a aria-label="OCD Live, accueil" className="wordmark" href="#accueil">
        <span className="wordmark-icon">O</span>
        <span>
          OCD<span className="wordmark-accent">LIVE</span>
        </span>
      </a>
      <nav aria-label="Navigation principale" className="main-nav">
        <a href="#formats">Nos formats</a>
        <a href="#offres">Les packages</a>
        <a href="#comment-ca-marche">Comment ça marche</a>
      </nav>
      <a className="header-cta" href="#reservation">
        Réserver un live <ArrowRight />
      </a>
    </header>
  );
}

function AppFooter() {
  return (
    <footer className="site-footer">
      <a aria-label="OCD Live, accueil" className="wordmark footer-wordmark" href="#accueil">
        <span className="wordmark-icon">O</span>
        <span>
          OCD<span className="wordmark-accent">LIVE</span>
        </span>
      </a>
      <span>Des idées qui méritent d’être vues.</span>
      <a href="#accueil">Retour en haut ↑</a>
    </footer>
  );
}

export default function Home() {
  const [mode, setMode] = useState<LiveMode | null>(null);
  const [packageIndex, setPackageIndex] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [client, setClient] = useState(initialClientDetails);
  const [business, setBusiness] = useState(initialBusinessDetails);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");

  const calendarDays = useMemo(() => {
    const firstOfMonth = new Date(2026, 11, 1);
    const offset = (firstOfMonth.getDay() + 6) % 7;
    const days = Array.from({ length: offset }, () => null as Date | null);
    for (let day = 1; day <= 31; day += 1) {
      days.push(new Date(2026, 11, day));
    }
    return days;
  }, []);

  const selectedPackage = packageIndex === null ? null : packages[packageIndex];

  function chooseMode(nextMode: LiveMode) {
    setMode(nextMode);
    setStep(packageIndex === null ? 1 : 2);
    setError("");
    window.setTimeout(
      () => document.getElementById("reservation")?.scrollIntoView({ behavior: "smooth" }),
      0,
    );
  }

  function chooseDate(date: Date) {
    setSelectedDate(date);
    setSelectedTime(null);
    setError("");
  }

  function nextStep() {
    setError("");
    setStep((current) => Math.min(current + 1, 5));
  }

  function submitClientDetails() {
    if (
      !client.name.trim() ||
      !client.phone.trim() ||
      !client.email.trim() ||
      !client.country.trim() ||
      !client.city.trim() ||
      !client.business.trim()
    ) {
      setError("Merci de compléter tous les champs obligatoires.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(client.email)) {
      setError("Veuillez saisir une adresse e-mail valide.");
      return;
    }
    nextStep();
  }

  function submitBusinessDetails() {
    if (
      !business.activity.trim() ||
      !business.products.trim() ||
      !business.featuredProduct.trim() ||
      !business.goal ||
      !business.audience.trim()
    ) {
      setError("Merci de compléter les champs obligatoires pour votre activité.");
      return;
    }
    nextStep();
  }

  function finishDemo() {
    setStep(6);
    setError("");
  }

  function updateClient(field: keyof ClientDetails, value: string) {
    setClient((current) => ({ ...current, [field]: value }));
  }

  function updateBusiness(field: keyof BusinessDetails, value: string) {
    setBusiness((current) => ({ ...current, [field]: value }));
  }

  return (
    <>
      <AppHeader />
      <main>
        <section className="hero" id="accueil">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              VOTRE RENDEZ-VOUS COMMERCIAL
            </div>
            <h1>
              Votre prochain live
              <br />
              <span>commence ici.</span>
            </h1>
            <p className="hero-description">
              Votre activité mérite d’être vue. Présentez vos produits en direct, avec
              une équipe à vos côtés du premier bonjour à la dernière vente.
            </p>
            <div className="hero-proof">
              <div aria-hidden="true" className="proof-avatars">
                <span>F</span>
                <span>A</span>
                <span>M</span>
              </div>
              <p>
                <strong>Votre live, votre histoire.</strong>
                <br />
                Nous vous aidons à la raconter.
              </p>
            </div>
          </div>
          <div aria-label="Entrepreneurs préparant un live ensemble" className="hero-image">
            <div className="image-shade" />
            <div className="image-caption">
              <span className="live-tag">
                <span /> LIVE, ENSEMBLE
              </span>
              <p>Les bonnes rencontres<br />font les grandes ventes.</p>
            </div>
            <div className="image-note">
              <span className="note-star">✳</span>
              <span>Votre idée<br />en grand.</span>
            </div>
          </div>
          <a aria-label="Découvrir nos formats" className="scroll-cue" href="#formats">
            <span className="scroll-line" /> FAITES DÉFILER
          </a>
        </section>

        <section className="formats-section section-wrap" id="formats">
          <div className="section-heading">
            <div>
              <div className="eyebrow">DEUX FAÇONS DE BRILLER</div>
              <h2>À vous de choisir la scène.</h2>
            </div>
            <p>Le même accompagnement attentif, là où vous êtes le plus à l’aise.</p>
          </div>
          <div className="format-grid">
            <button
              className="format-card format-presentiel"
              onClick={() => chooseMode("presentiel")}
              type="button"
            >
              <span className="format-photo presentiel-photo" />
              <span className="format-shade" />
              <span className="format-number">01 / À LOMÉ</span>
              <span className="format-card-bottom">
                <span>
                  <span className="format-label">ON VOUS ACCUEILLE</span>
                  <span className="format-title">En présentiel</span>
                  <span className="format-description">
                    Un espace prêt pour vous, votre équipe et vos produits.
                  </span>
                </span>
                <span aria-hidden="true" className="round-arrow">
                  <ArrowRight />
                </span>
              </span>
            </button>
            <button
              className="format-card format-distance"
              onClick={() => chooseMode("distance")}
              type="button"
            >
              <span className="format-photo distance-photo" />
              <span className="format-shade" />
              <span className="format-number">02 / OÙ QUE VOUS SOYEZ</span>
              <span className="format-card-bottom">
                <span>
                  <span className="format-label">ON EST À VOS CÔTÉS</span>
                  <span className="format-title">À distance</span>
                  <span className="format-description">
                    Depuis votre boutique ou chez vous, avec un assistant en direct.
                  </span>
                </span>
                <span aria-hidden="true" className="round-arrow">
                  <ArrowRight />
                </span>
              </span>
            </button>
          </div>
        </section>

        <section className="packages-section" id="offres">
          <div className="section-wrap">
            <div className="section-heading">
              <div>
                <div className="eyebrow">TROUVEZ VOTRE FORMAT</div>
                <h2>Le bon live, à votre mesure.</h2>
              </div>
              <p>Une session pour découvrir, une journée pour tout changer, un mois pour grandir.</p>
            </div>
            <div className="package-grid">
              {packages.map((item, index) => (
                <article
                  className={`package-card${"featured" in item && item.featured ? " package-featured" : ""}`}
                  key={item.name}
                >
                  {"featured" in item && item.featured && (
                    <span className="package-badge">LE PLUS CHOISI</span>
                  )}
                  <span className="package-index">0{index + 1}</span>
                  <h3>{item.name}</h3>
                  <span className="package-duration">
                    <ClockIcon />
                    {item.duration}
                  </span>
                  <p className="package-description">{item.description}</p>
                  <ul>
                    {item.features.map((feature) => (
                      <li key={feature}>
                        <span className="check-mark">✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="package-price">{formatPrice(item.price)}</div>
                  {item.price === null && (
                    <span className="price-note">Tarif à confirmer avec notre équipe</span>
                  )}
                  <button
                    className="package-select"
                    onClick={() => {
                      setPackageIndex(index);
                      setStep(mode ? 2 : 1);
                      if (mode) {
                        document
                          .getElementById("reservation")
                          ?.scrollIntoView({ behavior: "smooth" });
                      } else {
                        document
                          .getElementById("formats")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    type="button"
                  >
                    Choisir ce package <ArrowRight />
                  </button>
                </article>
              ))}
            </div>
            <p className="price-disclaimer">
              Le tarif Découverte est indicatif. Les autres prix seront confirmés par
              l’équipe OCD Live avant toute réservation.
            </p>
          </div>
        </section>

        <section className="steps-section section-wrap" id="comment-ca-marche">
          <div className="steps-intro">
            <div className="eyebrow">SIMPLE COMME UN BONJOUR</div>
            <h2>Vous avez le projet.<br />On s’occupe du reste.</h2>
            <a className="text-link" href="#reservation">
              Choisir ma date <ArrowRight />
            </a>
          </div>
          <ol className="steps-list">
            {[
              ["01", "Choisissez votre format", "En studio à Lomé ou accompagnés à distance."],
              ["02", "Trouvez votre créneau", "Sélectionnez une date et l’horaire qui vous conviennent."],
              ["03", "Parlons de votre projet", "Dites-nous tout sur votre activité et votre audience."],
              ["04", "Préparez-vous à briller", "Notre équipe vous recontacte pour confirmer votre live."],
            ].map(([number, title, description]) => (
              <li key={number}>
                <span className="step-number">{number}</span>
                <span>
                  <strong>{title}</strong>
                  <span className="step-description">{description}</span>
                </span>
                <ArrowRight />
              </li>
            ))}
          </ol>
        </section>

        <section className="booking-section" id="reservation">
          <div className="booking-wrap">
            <div className="booking-intro">
              <div className="eyebrow">ON PASSE À L’ACTION ?</div>
              <h2>Votre prochain live<br />est à portée de clic.</h2>
              <p>
                Quelques informations, un créneau, et notre équipe prend le relais.
                Sans engagement ni paiement en ligne pour le moment.
              </p>
              <div className="booking-note">
                <span className="note-star">✳</span>
                <span>On confirme chaque demande personnellement avant votre live.</span>
              </div>
            </div>

            <div aria-label="Parcours de réservation" className="booking-panel">
              <div className="booking-panel-head">
                <div>
                  <span className="booking-kicker">RÉSERVATION</span>
                  <h3>{step === 6 ? "C’est tout bon !" : "Commençons ensemble."}</h3>
                </div>
                {step > 0 && step < 6 && (
                  <span className="step-count">ÉTAPE {step} / 5</span>
                )}
              </div>
              {step > 0 && step < 6 && (
                <div aria-hidden="true" className="progress-track">
                  <span style={{ width: `${(step / 5) * 100}%` }} />
                </div>
              )}

              {step === 0 && (
                <div className="booking-content">
                  <p className="step-prompt">Où souhaitez-vous faire votre live ?</p>
                  <div className="mode-options">
                    <button className="mode-option" onClick={() => chooseMode("presentiel")} type="button">
                      <span className="mode-icon">01</span>
                      <span>
                        <strong>En présentiel</strong>
                        <small>Dans nos locaux à Lomé</small>
                      </span>
                      <ArrowRight />
                    </button>
                    <button className="mode-option" onClick={() => chooseMode("distance")} type="button">
                      <span className="mode-icon">02</span>
                      <span>
                        <strong>À distance</strong>
                        <small>Chez vous, accompagné·e en direct</small>
                      </span>
                      <ArrowRight />
                    </button>
                  </div>
                  <p className="booking-footnote">
                    Aucun paiement n’est demandé à cette étape.
                  </p>
                </div>
              )}

              {step === 1 && (
                <div className="booking-content">
                  {!mode ? (
                    <>
                      <p className="step-prompt">Commencez par choisir votre format.</p>
                      <div className="mode-options">
                        <button className="mode-option" onClick={() => chooseMode("presentiel")} type="button">
                          <span className="mode-icon">01</span>
                          <span><strong>En présentiel</strong><small>Dans nos locaux à Lomé</small></span>
                          <ArrowRight />
                        </button>
                        <button className="mode-option" onClick={() => chooseMode("distance")} type="button">
                          <span className="mode-icon">02</span>
                          <span><strong>À distance</strong><small>Avec un assistant OCD Live</small></span>
                          <ArrowRight />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="step-prompt">
                        {packageIndex === null
                          ? "Choisissez le package qui vous ressemble."
                          : "Votre package a été sélectionné. Choisissez une date."}
                      </p>
                      {packageIndex === null && (
                        <div className="inline-package-list">
                          {packages.map((item, index) => (
                            <button
                              className="inline-package"
                              key={item.name}
                              onClick={() => {
                                setPackageIndex(index);
                                setStep(2);
                                setError("");
                              }}
                              type="button"
                            >
                              <span>
                                <strong>{item.name}</strong>
                                <small>{item.duration} · {formatPrice(item.price)}</small>
                              </span>
                              <ArrowRight />
                            </button>
                          ))}
                        </div>
                      )}
                      {packageIndex !== null && (
                        <div className="booking-summary-card">
                          <span className="summary-label">PACKAGE SÉLECTIONNÉ</span>
                          <strong>{selectedPackage?.name} · {selectedPackage?.duration}</strong>
                          <span>{formatPrice(selectedPackage?.price ?? null)}</span>
                        </div>
                      )}
                    </>
                  )}
                  <button
                    className="text-button back-button"
                    onClick={() => {
                      setStep(0);
                      setMode(null);
                    }}
                    type="button"
                  >
                    ← Changer de format
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="booking-content">
                  <div className="selection-chips">
                    <span>{mode === "presentiel" ? "Présentiel · Lomé" : "À distance"}</span>
                    <span>{selectedPackage?.name} · {selectedPackage?.duration}</span>
                  </div>
                  <div className="calendar-heading">
                    <span><CalendarIcon /> Décembre 2026</span>
                    <span className="calendar-caption">Choisissez une date disponible</span>
                  </div>
                  <div aria-label="Calendrier de décembre 2026" className="calendar-grid">
                    {weekDays.map((day) => (
                      <span className="calendar-weekday" key={day}>{day}</span>
                    ))}
                    {calendarDays.map((date, index) => {
                      if (!date) return <span aria-hidden="true" className="calendar-empty" key={`empty-${index}`} />;
                      const iso = date.toISOString().slice(0, 10);
                      const unavailable = date.getDay() === 0 || [5, 12, 19, 24].includes(date.getDate());
                      const active = selectedDate?.getDate() === date.getDate();
                      return (
                        <button
                          aria-label={`${date.getDate()} décembre 2026${unavailable ? ", indisponible" : ""}`}
                          aria-pressed={active}
                          className={`calendar-day${unavailable ? " day-unavailable" : ""}${active ? " day-active" : ""}`}
                          disabled={unavailable}
                          key={iso}
                          onClick={() => chooseDate(date)}
                          type="button"
                        >
                          {date.getDate()}
                        </button>
                      );
                    })}
                  </div>
                  {selectedDate && (
                    <div className="time-picker">
                      <span className="time-picker-title">
                        <ClockIcon /> {formatLongDate(selectedDate)}
                      </span>
                      <div className="time-options">
                        {timeSlots.map((time, index) => {
                          const unavailable =
                            (selectedDate.getDate() + index) % 5 === 0 ||
                            (selectedDate.getDate() === 1 && time === "10:00");
                          return (
                            <button
                              aria-pressed={selectedTime === time}
                              className={`time-option${selectedTime === time ? " time-active" : ""}`}
                              disabled={unavailable}
                              key={time}
                              onClick={() => {
                                setSelectedTime(time);
                                setError("");
                              }}
                              type="button"
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  <p className="calendar-note">
                    Les créneaux marqués comme indisponibles ne peuvent pas être sélectionnés.
                    Disponibilités de démonstration, à connecter à un calendrier réel.
                  </p>
                  {error && <p className="form-error" role="alert">{error}</p>}
                  <div className="booking-actions">
                    <button className="text-button" onClick={() => setStep(1)} type="button">← Retour</button>
                    <button
                      className="primary-button"
                      disabled={!selectedDate || !selectedTime}
                      onClick={nextStep}
                      type="button"
                    >
                      Continuer <ArrowRight />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="booking-content">
                  <p className="step-prompt">Faisons connaissance.</p>
                  <p className="step-subprompt">Les champs marqués d’un * sont obligatoires.</p>
                  <div className="form-grid">
                    <label className="field field-full">
                      Nom et prénom *
                      <input
                        autoComplete="name"
                        onChange={(event) => updateClient("name", event.target.value)}
                        placeholder="Ex. Afi Mensah"
                        value={client.name}
                      />
                    </label>
                    <label className="field">
                      Téléphone *
                      <input
                        autoComplete="tel"
                        onChange={(event) => updateClient("phone", event.target.value)}
                        placeholder="+228 90 00 00 00"
                        type="tel"
                        value={client.phone}
                      />
                    </label>
                    <label className="field">
                      Adresse e-mail *
                      <input
                        autoComplete="email"
                        onChange={(event) => updateClient("email", event.target.value)}
                        placeholder="vous@exemple.com"
                        type="email"
                        value={client.email}
                      />
                    </label>
                    <label className="field">
                      Pays *
                      <input
                        autoComplete="country-name"
                        onChange={(event) => updateClient("country", event.target.value)}
                        placeholder="Votre pays"
                        value={client.country}
                      />
                    </label>
                    <label className="field">
                      Ville *
                      <input
                        autoComplete="address-level2"
                        onChange={(event) => updateClient("city", event.target.value)}
                        placeholder="Votre ville"
                        value={client.city}
                      />
                    </label>
                    <label className="field field-full">
                      Nom de l’entreprise ou du commerce *
                      <input
                        autoComplete="organization"
                        onChange={(event) => updateClient("business", event.target.value)}
                        placeholder="Le nom de votre activité"
                        value={client.business}
                      />
                    </label>
                  </div>
                  {error && <p className="form-error" role="alert">{error}</p>}
                  <div className="booking-actions">
                    <button className="text-button" onClick={() => setStep(2)} type="button">← Retour</button>
                    <button className="primary-button" onClick={submitClientDetails} type="button">
                      Continuer <ArrowRight />
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="booking-content">
                  <p className="step-prompt">Parlez-nous de votre activité.</p>
                  <p className="step-subprompt">Cela nous aidera à préparer un live qui vous ressemble.</p>
                  <div className="form-grid">
                    <label className="field field-full">
                      Quel type de business exercez-vous ? *
                      <input
                        onChange={(event) => updateBusiness("activity", event.target.value)}
                        placeholder="Ex. Mode, beauté, alimentation..."
                        value={business.activity}
                      />
                    </label>
                    <label className="field field-full">
                      Quels produits ou services vendez-vous ? *
                      <textarea
                        onChange={(event) => updateBusiness("products", event.target.value)}
                        placeholder="Décrivez votre offre en quelques mots"
                        rows={2}
                        value={business.products}
                      />
                    </label>
                    <label className="field field-full">
                      Quel produit souhaitez-vous présenter ? *
                      <input
                        onChange={(event) => updateBusiness("featuredProduct", event.target.value)}
                        placeholder="Le produit ou service phare de votre live"
                        value={business.featuredProduct}
                      />
                    </label>
                    <label className="field field-full">
                      Quel est votre objectif principal ? *
                      <select
                        onChange={(event) => updateBusiness("goal", event.target.value)}
                        value={business.goal}
                      >
                        <option disabled value="">Choisissez votre objectif</option>
                        <option value="Vendre">Vendre</option>
                        <option value="Faire connaître ma marque">Faire connaître ma marque</option>
                        <option value="Lancer un produit">Lancer un produit</option>
                        <option value="Promouvoir mon entreprise">Promouvoir mon entreprise</option>
                      </select>
                    </label>
                    <label className="field field-full">
                      À qui souhaitez-vous vous adresser ? *
                      <input
                        onChange={(event) => updateBusiness("audience", event.target.value)}
                        placeholder="Décrivez votre public cible"
                        value={business.audience}
                      />
                    </label>
                    <label className="field field-full">
                      Vos pages Facebook, TikTok ou Instagram
                      <input
                        onChange={(event) => updateBusiness("socialLinks", event.target.value)}
                        placeholder="@votrecompte ou lien vers vos pages"
                        value={business.socialLinks}
                      />
                    </label>
                  </div>
                  {error && <p className="form-error" role="alert">{error}</p>}
                  <div className="booking-actions">
                    <button className="text-button" onClick={() => setStep(3)} type="button">← Retour</button>
                    <button className="primary-button" onClick={submitBusinessDetails} type="button">
                      Récapitulatif <ArrowRight />
                    </button>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="booking-content">
                  <p className="step-prompt">Un dernier coup d’œil avant de vous lancer.</p>
                  <div className="review-card">
                    <div className="review-section">
                      <span className="summary-label">VOTRE LIVE</span>
                      <strong>{mode === "presentiel" ? "En présentiel · Lomé" : "À distance"}</strong>
                      <span>{selectedPackage?.name} · {selectedPackage?.duration}</span>
                      <span>{selectedDate ? formatLongDate(selectedDate) : ""} · {selectedTime}</span>
                    </div>
                    <div className="review-section">
                      <span className="summary-label">VOS COORDONNÉES</span>
                      <strong>{client.name}</strong>
                      <span>{client.business} · {client.city}, {client.country}</span>
                      <span>{client.phone} · {client.email}</span>
                    </div>
                    <div className="review-section">
                      <span className="summary-label">VOTRE PROJET</span>
                      <strong>{business.activity}</strong>
                      <span>{business.featuredProduct} · Objectif : {business.goal}</span>
                    </div>
                    <div className="review-total">
                      <span>Tarif du package</span>
                      <strong>{formatPrice(selectedPackage?.price ?? null)}</strong>
                    </div>
                  </div>
                  <p className="calendar-note">
                    Aucun paiement n’est effectué en ligne. L’équipe OCD Live vous contacte
                    pour confirmer le tarif, la disponibilité et les prochaines étapes.
                  </p>
                  {error && <p className="form-error" role="alert">{error}</p>}
                  <div className="booking-actions">
                    <button className="text-button" onClick={() => setStep(4)} type="button">← Modifier</button>
                    <button className="primary-button" onClick={finishDemo} type="button">
                      Confirmer ma demande <ArrowRight />
                    </button>
                  </div>
                </div>
              )}

              {step === 6 && (
                <div className="booking-content success-content">
                  <span aria-hidden="true" className="success-icon">✓</span>
                  <h4>Merci, {client.name.split(" ")[0] || "à bientôt"} !</h4>
                  <p>
                    Votre parcours de réservation est terminé. Votre live de démonstration
                    est prévu le <strong>{selectedDate ? formatLongDate(selectedDate) : ""}</strong> à{" "}
                    <strong>{selectedTime}</strong>.
                  </p>
                  <div className="demo-notice">
                    Ceci est une maquette : aucune donnée n’a été transmise, aucune
                    réservation réelle n’a été créée et aucun e-mail n’a été envoyé.
                  </div>
                  <button
                    className="primary-button"
                    onClick={() => {
                      setStep(0);
                      setMode(null);
                      setPackageIndex(null);
                      setSelectedDate(null);
                      setSelectedTime(null);
                      setClient(initialClientDetails);
                      setBusiness(initialBusinessDetails);
                    }}
                    type="button"
                  >
                    Recommencer <ArrowRight />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="closing-section section-wrap">
          <span className="closing-star">✳</span>
          <div>
            <div className="eyebrow">À BIENTÔT EN DIRECT</div>
            <h2>Votre histoire<br />est prête à grandir.</h2>
          </div>
          <a className="closing-link" href="#reservation">
            Réserver mon live <ArrowRight />
          </a>
        </section>
      </main>
      <AppFooter />
    </>
  );
}
