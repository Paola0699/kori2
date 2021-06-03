import logo from './logo.svg';
import './App.css';
import './assets/vendor/aos/aos.css'
import './assets/vendor/bootstrap/css/bootstrap.min.css'
import "./assets/vendor/bootstrap-icons/bootstrap-icons.css"
import "./assets/vendor/boxicons/css/boxicons.min.css"
import "./assets/vendor/glightbox/css/glightbox.min.css"
import "./assets/vendor/remixicon/remixicon.css"
import "./assets/vendor/swiper/swiper-bundle.min.css"
import "./assets/css/style.css"
import video from './jelly2.mov'
import logofinal from './logofinal.png'
import process from './process3.png'

import icon1 from './assets/img/icons/internet-of-things.png'
import icon2 from './assets/img/icons/discovery.png'
import icon3 from './assets/img/icons/business.png'
import icon4 from './assets/img/icons/presentation.png'
import icon5 from './assets/img/icons/programming.png'
import icon6 from './assets/img/icons/cyber-security.png'

import paola from './assets/img/testimonials/paola.jpeg'
import osvaldo from './assets/img/testimonials/osvaldo.jpeg'
import andre from './assets/img/testimonials/andre.jpeg'
import hector from './assets/img/testimonials/hector.jpeg'

import { useEffect, useRef, useState } from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel'
import * as emailjs from 'emailjs-com'
import Swal from 'sweetalert2'

function App() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const nameRef = useRef();
  const emailRef = useRef();
  const subjectRef = useRef();
  const messageRef = useRef();

  const fields = [
    nameRef,
    emailRef,
    subjectRef,
    messageRef,
  ]

  useEffect(() => {
    const select = (el, all = false) => {
      el = el.trim()
      if (all) {
        return [...document.querySelectorAll(el)]
      } else {
        return document.querySelector(el)
      }
    }

    const on = (type, el, listener, all = false) => {
      let selectEl = select(el, all)
      if (selectEl) {
        if (all) {
          selectEl.forEach(e => e.addEventListener(type, listener))
        } else {
          selectEl.addEventListener(type, listener)
        }
      }
    }

    const onscroll = (el, listener) => {
      el.addEventListener('scroll', listener)
    }
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
      let position = window.scrollY + 200
      navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hash) return
        let section = select(navbarlink.hash)
        if (!section) return
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active')
        } else {
          navbarlink.classList.remove('active')
        }
      })
    }

    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    const scrollto = (el) => {
      let header = select('#header')
      let offset = header.offsetHeight

      if (!header.classList.contains('header-scrolled')) {
        offset -= 20
      }

      let elementPos = select(el).offsetTop
      window.scrollTo({
        top: elementPos - offset,
        behavior: 'smooth'
      })
    }

    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select('#header')
    if (selectHeader) {
      const headerScrolled = () => {
        if (window.scrollY > 100) {
          selectHeader.classList.add('header-scrolled')
        } else {
          selectHeader.classList.remove('header-scrolled')
        }
      }
      window.addEventListener('load', headerScrolled)
      onscroll(document, headerScrolled)
    }

    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add('active')
        } else {
          backtotop.classList.remove('active')
        }
      }
      window.addEventListener('load', toggleBacktotop)
      onscroll(document, toggleBacktotop)
    }

    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function (e) {
      select('#navbar').classList.toggle('navbar-mobile')
      this.classList.toggle('bi-list')
      this.classList.toggle('bi-x')
    })

    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function (e) {
      if (select('#navbar').classList.contains('navbar-mobile')) {
        e.preventDefault()
        this.nextElementSibling.classList.toggle('dropdown-active')
      }
    }, true)

    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function (e) {
      if (select(this.hash)) {
        e.preventDefault()

        let navbar = select('#navbar')
        if (navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile')
          let navbarToggle = select('.mobile-nav-toggle')
          navbarToggle.classList.toggle('bi-list')
          navbarToggle.classList.toggle('bi-x')
        }
        scrollto(this.hash)
      }
    }, true)

    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
      if (window.location.hash) {
        if (select(window.location.hash)) {
          scrollto(window.location.hash)
        }
      }
    });

    /**
     * Preloader
     */
    let preloader = select('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.remove()
      });
    }

  }, [])

  const sendMessage = () => {
    emailjs.send("service_6itt4dm", "template_l9ps3ll", {
      from_name: name,
      message: message,
      from_email: email,
      subject: subject,
    }, "user_ANxJpCrTZOWyOviagSs88").then((result) => {
      fields.forEach(field => field.current.value = '')
      console.log(result.text);
      Swal.fire({
        title: '¡Enviado!',
        text: 'Hemos recibido tu mensaje. Nos pondremos en contacto contigo a la brevedad.',
        icon: 'success',
        confirmButtonColor: '#0070b8',
      }
      )
    }, (error) => {
      console.log(error.text);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.text,
        confirmButtonColor: '#0070b8',
      })
    });
  }

  return (
    <div className="App">
      <header id="header" className="fixed-top d-flex align-items-center header-transparent">
        <div className="container d-flex align-items-center justify-content-between">
          <div className="logo">
            <a href="index.html"><img src={logofinal} alt="" className="img-fluid" /></a>
          </div>

          <nav id="navbar" className="navbar">
            <ul>
              <li><a className="nav-link scrollto active" href="#hero">Inicio</a></li>
              <li><a className="nav-link scrollto" href="#about">Proceso</a></li>
              <li><a className="nav-link scrollto" href="#features">Servicios</a></li>
              <li><a className="nav-link scrollto" href="#contact">Contacto</a></li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>
        </div>
      </header>

      <div className="section">
        <div id='hero' style={{ zIndex: '100' }}>
          <h1 style={{textAlign:'left'}}><b style={{ fontSize: '100px' }}>Kōri</b> <br /><span>CONEXIONANDO</span> AL MUNDO</h1>
          <div className="text-center text-lg-start">
            <a href="#contact" className="btn-get-started scrollto">Contáctanos</a>
          </div>
        </div>

        <div className="video-container">
          <div className="color-overlay"></div>
          <video autoPlay loop muted>
            <source src={video} type="video/mp4" />
          </video>
        </div>
      </div>

      <main id="main">
        <section id="about" className="about">
          <div className="container-fluid">
            <div className="row">
              <div
                className="col-xl-12 col-lg-12 icon-boxes d-flex flex-column align-items-center justify-content-center py-5 px-lg-5">
                <h3>Nuestro Proceso</h3>
                <p style={{ textAlign: 'center' }}>Brindamos soluciones tecnológicas conforme a tus necesidades.</p>
                <img src={process} className='processimg' />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="features" style={{ background: 'ghostwhite' }}>
          <div className="container">

            <div className="section-title">
              <h2>Servicios</h2>
              <p>Conoce nuestros servicios</p>
            </div>

            <div className="row" /* data-aos="fade-left" */>
              <div className="col-lg-4 col-md-4">
                <div className="icon-box" /* data-aos="zoom-in" data-aos-delay="50" */>
                  <img src={icon1} style={{ marginRight: '5%' }} />

                  <p style={{ textAlign: 'left' }}><b><a href="">Internet of Things</a></b><br />
                Implementamos el internet de las cosas para brindar nuevas funcionalidades como la automatización de
                procesos y resultados medibles.
              </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 mt-4 mt-md-0">
                <div className="icon-box" /* data-aos="zoom-in" data-aos-delay="100" */>
                  <img src={icon2} style={{ marginRight: '5%' }} />
                  <p style={{ textAlign: 'left' }}><b><a href="">Product Discovery</a></b><br />
                Nuestros expertos analizarán cuidadosamente tu problemática y/o iniciativa para proponer una solución a
                la medida.

              </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 mt-4 mt-md-0">
                <div className="icon-box" /* data-aos="zoom-in" data-aos-delay="150" */>
                  <img src={icon3} style={{ marginRight: "5%" }} />
                  <p style={{ textAlign: 'left' }}><b><a href="">IT Consulting</a></b><br />
                Utilizando altos estándares de calidad, facilitando el proceso de digitalización para conectar tu
                empresa al mundo.
              </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 mt-4">
                <div className="icon-box" /* data-aos="zoom-in" data-aos-delay="200" */>
                  <img src={icon4} style={{ marginRight: "5%" }} />
                  <p style={{ textAlign: 'left' }}><b><a href="">Training</a></b><br />
                Capacitamos a tu equipo de trabajo a través de cursos y prácticas sobre el uso de tecnologías.
              </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 mt-4">
                <div className="icon-box" /* data-aos="zoom-in" data-aos-delay="250" */>
                  <img src={icon5} style={{ marginRight: "5%" }} />
                  <p style={{ textAlign: 'left' }}><b><a href="">Software Development</a></b><br />
                Diseñamos, desarrollamos e implementamos software modular, escalable, ágil e intuitivo.
              </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 mt-4">
                <div className="icon-box" /* data-aos="zoom-in" data-aos-delay="300" */>
                  <img src={icon6} style={{ marginRight: "5%" }} />
                  <p style={{ textAlign: 'left' }}><b><a href="">Security</a></b><br />
                Mejoramos la seguridad física y digital de tu empresa.
              </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section id="testimonials" className="testimonials">
          <div className="container">

            <div className="testimonials-slider swiper-container" /* data-aos="fade-up" data-aos-delay="100" */>
              <Carousel autoPlay={true} showIndicators={false} showThumbs={false}>
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <img src={paola} className="testimonial-img" alt="" />
                    <h3>Paola Pérez</h3>
                    <h4>CIO</h4>
                    <p>
                      <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                  Soy una apasionada por mi carrera. Busco brindarle a los clientes la mejor solución que se adapte a sus necesidades. A través de mis habilidades para desarrollar e implementar soluciones basadas en web. Disfruto viajar y hacer ejercicio.
                  <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                    </p>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <img src={osvaldo} className="testimonial-img" alt="" />
                    <h3>Osvaldo Gómez</h3>
                    <h4>CEO</h4>
                    <p>
                      <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                      Soy una persona trabajadora, amante de los retos, adaptable y detallista. Mis habilidades destacan en la instalación de tecnologías, manejo de redes y gestión de sistemas informáticos, de igual forma cuento con certificaciones como ITILV4, SCRUM e Inglés Empresarial. Mi principal meta es brindar la mejor experiencia al cliente y la solución de sus problemas con tecnología.
                  <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                    </p>
                  </div>
                </div>

                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <img src={andre} className="testimonial-img" alt="" />
                    <h3>André M. Gutierrez</h3>
                    <h4>CTO</h4>
                    <p>
                      <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                  Soy un profesionista con capacidad de adaptación, autodidacta ordenado y responsable. Mis habilidades técnicas son el conocimiento de varios lenguajes de programación como Python, JavaScript, C++ y manejo de bases de datos, además de certificaciones en SCRUM e ITILv4. Mis hobbies son el ejercicio, la lectura y los videojuegos.
                  <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                    </p>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <img src={hector} className="testimonial-img" alt="" />
                    <h3>Héctor Riveroll</h3>
                    <h4>Director Creativo</h4>
                    <p>
                      <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                      Siempre estoy en búsqueda de las soluciones mas eficientes y creativas ante los problemas. Productor, diseñador y calificado realizador audiovisual para el desarrollo de proyectos multidisciplinarios de alto nivel. Disfruto de leer, ver películas y escribir.
                  <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                    </p>
                  </div>
                </div>
              </Carousel>
            </div>

          </div>
        </section>


        <section id="contact" className="contact">
          <div className="container">

            <div className="section-title"/*  data-aos="fade-up" */>
              <h2>Contacto</h2>
              <p>Contáctanos</p>
            </div>

            <div className="row">

              <div className="col-lg-4" /* data-aos="fade-right" data-aos-delay="100" */>
                <div className="info">
                  <div className="address">
                    <i className="bi bi-geo-alt"></i>
                    <h4 style={{ textAlign: 'left' }}>Ubicación:</h4>
                    <p style={{ textAlign: 'left' }}>Pachuca de Soto, Hidalgo, México</p>
                  </div>

                  <div className="email">
                    <i className="bi bi-envelope"></i>
                    <h4 style={{ textAlign: 'left' }}>Correo Electrónico:</h4>
                    <p style={{ textAlign: 'left' }}>korimail.digital@gmail.com</p>
                  </div>

                  <div className="phone">
                    <i className="bi bi-phone"></i>
                    <h4 style={{ textAlign: 'left' }}>Teléfono:</h4>
                    <p style={{ textAlign: 'left' }}>771 240 9254</p>
                  </div>

                </div>

              </div>

              <div className="col-lg-8 mt-5 mt-lg-0" /* data-aos="fade-left" data-aos-delay="200" */>
                <div className="row">
                  <div className="col-md-6 form-group">
                    <input ref={nameRef} type="text" name="name" className="form-control" id="name" placeholder="Nombre" required onChange={e => setName(e.target.value)} />
                  </div>
                  <div className="col-md-6 form-group mt-3 mt-md-0">
                    <input ref={emailRef} type="email" className="form-control" name="email" id="email" placeholder="Correo electrónico" required onChange={e => setEmail(e.target.value)} />
                  </div>
                </div>
                <div className="form-group mt-3">
                  <input ref={subjectRef} type="text" className="form-control" name="subject" id="subject" placeholder="Asunto" required onChange={e => setSubject(e.target.value)} />
                </div>
                <div className="form-group mt-3">
                  <textarea ref={messageRef} className="form-control" name="message" rows="5" placeholder="Mensaje" required onChange={e => setMessage(e.target.value)}></textarea>
                </div>
                <br />
                <div className="text-center">
                  {!name || !message || !subject || !email ?
                    null : <button type="submit" onClick={sendMessage} className='botonEnviar'>Enviar Mensaje</button>}
                </div>

              </div>

            </div>

          </div>
        </section>
      </main>

      <footer id="footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">

              <div className="col-lg-4 col-md-6">
                <div className="footer-info">
                  <h3>Kōri</h3>
                  <p className="pb-3"><em>Brindamos soluciones tecnológicas conforme a tus necesidades.</em></p>
                  <p>
                    Pachuca de Soto <br />
                      Hidalgo, México<br /><br />
                    <strong>Teléfono:</strong> 771 240 9254<br />
                    <strong>Correo electrónico:</strong> korimail.digital@gmail.com<br />
                  </p>
                  <div className="social-links mt-3">
                    {/*  <a href="#" className="twitter"><i className="bx bxl-twitter"></i></a>
                    <a href="#" className="facebook"><i className="bx bxl-facebook"></i></a>
                    <a href="#" className="instagram"><i className="bx bxl-instagram"></i></a>
                    <a href="#" className="linkedin"><i className="bx bxl-linkedin"></i></a> */}
                  </div>
                </div>
              </div>

              <div className="col-lg-2 col-md-6 footer-links">

              </div>

              <div className="col-lg-2 col-md-6 footer-links">

              </div>

              <div className="col-lg-4 col-md-6 footer-newsletter">

              </div>

            </div>
          </div>
        </div>

        <div className="container">
          <div className="copyright">
            &copy; Copyright <strong><span>Kori</span></strong>. All Rights Reserved
      </div>
          <div className="credits">

          </div>
        </div>
      </footer>
      <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i
        className="bi bi-arrow-up-short"></i></a>
      <div id="preloader"></div>

    </div>
  );
}

export default App;
