import { useState, useRef, useEffect } from "react";
import "./RegistrationForm.css";

const API_BASE = import.meta.env.VITE_API_URL || "";
const EMPTY_FORM = { name: "", email: "", specialty: "" };

function RegistrationForm() {
  // estado do formulário: os valores atuais de cada campo, inicialmente vazios
  const [form, setForm] = useState(EMPTY_FORM);
  // Erros de validação do formulário (ex: "Name is required")
  const [errors, setErrors] = useState({});
  // Em que estado estamos: idle, loading, success, or error
  const [status, setStatus] = useState("idle");
  // Erros do servidor
  const [apiError, setApiError] = useState("");

  // Usado para pode usar o IntersectionObserver para a animação de fade-in quando a seção entra na tela.
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    // Para usar o observer, precisamos de lhe dar um elemento para observar. Usamos a ref que criamos para isso.
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // "e" é o objeto de evento que o navegador passa para a função quando um campo muda.
  const handleChange = (e) => {
    // diz qual o nome do campo que mudou (ex: "email") e seu novo valor (ex: "diogo@cognipharma.com")
    const { name, value } = e.target;

    // Update só o campo que mudou, mantendo os outros valores do formulário intactos.
    // [name] só muda o campo correspondente que começou o evento.
    setForm((prev) => ({ ...prev, [name]: value }));

    // Limpar o erro de validação ao escrever
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validação
  // Ver se todos os campos estão preenchidos e o email é válido.
  // Retorna true se for valido ou falso se não for.
  const validate = () => {
    // next guarda as mensagens de erro ao validar o formulário.
    const next = {};
    if (!form.name.trim()) next.name = "Full Name is required";
    if (!form.email.trim()) {
      next.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      next.email = "Please enter a valid Email Address.";
    }
    if (!form.specialty.trim()) next.specialty = "Specialty is required.";

    setErrors(next); //guarda erros no next

    // se o Object.keys(next).length for 0, significa que não há erros
    // e o formulário é válido. Se for maior que 0, tem erros.
    return Object.keys(next).length === 0;
  };

  // Submissão
  // "async" significa que esta função pode usar "await" para esperar por operações assíncronas, tipo uma chamada ao servidor.
  const handleSubmit = async (e) => {
    // nao deixa fazer refresh da página.
    e.preventDefault();

    // Corre a validação
    if (!validate()) return;

    // Diz que estamos à espera do servidor e limpa os erros anteriores do servidor.
    setStatus("loading");
    setApiError(""); // Clear any previous server error message.

    try {
      // "fetch" é a função do browser para fazer HTTP requests.
      const response = await fetch(`${API_BASE}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form), // Converter o JS para string de JSON.
      });

      // Parse o JSON body do servidor para um objeto JS.
      const data = await response.json();

      if (!response.ok) {
        // HTTP status codes 400–599 significam que alguma coisa deu errado.
        // Mostrar a mensagem de erro do servidor se tiver, ou uma mensagem genérica se não tiver
        setApiError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      } else {
        // HTTP 200–299 foi sucesso, mostrar mensagem de sucesso.
        setStatus("success");
      }
    } catch {
      // o catch só roda se o pedido falhar, tipo se estiver offline.
      setApiError("Could not reach the Server. Please try again later.");
      setStatus("error");
    }
  };

  return (
    <section className="register fade-in" id="register" ref={sectionRef}>
      <div className="register__inner container">
        <div className="register__copy">
          <p className="section-label">Registration</p>
          <h2 className="section-heading">Secure your free spot</h2>
          <p className="register__desc">
            This webinar is free and seats are limited. Register now and receive
            the access link directly in your inbox before the event.
          </p>
        </div>

        <div className="register__card">
          {status === "success" ? (
            <div className="register__success" role="alert">
              <img
                src="/assets/icon-check.svg"
                alt=""
                aria-hidden="true"
                className="register__check"
              />
              <h3>You're registered!</h3>
              <p>
                Thank you. You'll receive the access link in your inbox before
                June 15th.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {status === "error" && apiError && (
                <div className="register__api-error" role="alert">
                  {apiError}
                </div>
              )}
              <div
                className={`form-group${errors.name ? " form-group--error" : ""}`}
              >
                <label htmlFor="reg-name">Full Name</label>
                <input
                  id="reg-name"
                  name="name"
                  type="text"
                  placeholder="Dr. John Doe"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
                {/* Só mostra erro se errors.name tiver algum valor verdadeiro */}
                {errors.name && (
                  <p className="form-error" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              <div
                className={`form-group${errors.email ? " form-group--error" : ""}`}
              >
                <label htmlFor="reg-email">Email Address</label>
                <input
                  id="reg-email"
                  name="email"
                  type="email"
                  placeholder="jane@hospital.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="form-error" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div
                className={`form-group${errors.specialty ? " form-group--error" : ""}`}
              >
                <label htmlFor="reg-specialty">Specialty</label>

                <select
                  id="reg-specialty"
                  name="specialty"
                  value={form.specialty}
                  onChange={handleChange}
                >
                  <option value="">Select your specialty…</option>
                  <option>Cardiology</option>
                  <option>Oncology</option>
                  <option>Neurology</option>
                  <option>Pharmacology</option>
                  <option>Research</option>
                  <option>Other</option>
                </select>
                {errors.specialty && (
                  <p className="form-error" role="alert">
                    {errors.specialty}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn btn--primary btn--full"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Registering…" : "Register Now"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default RegistrationForm;
