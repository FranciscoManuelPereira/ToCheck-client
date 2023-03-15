import React from 'react'
import '../components/footer.css'

function Footer() {
  return (
<footer>
    <div className="footer">
        <img className="footer-img" src="/src/assets/TocheckLogo-removebg-preview.png" alt="footer logo image"/>
        <div className="footer-body">
            <p className="card-text">TOCHÉ in your life flow!</p>
            <p className="card-text">contact@tocheck.com</p>
            <p className="card-text"><small class="text-muted">
            <span>Developed by <a href="https://github.com/marianamedeirosfranco">Mariana Franco</a> and <a href="https://github.com/franciscomanuelpereira">Francisco Pereira</a></span></small></p>
        </div>
    </div>
</footer>
  )
}

export default Footer;
