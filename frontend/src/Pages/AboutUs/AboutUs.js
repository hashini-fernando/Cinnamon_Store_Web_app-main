import React from 'react'
import classes from './aboutus.module.css';



export default function AboutUs() {


  const pageStyle = {
   
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  };
  const titleStyle = {
    paddingLeft: '50px',
    fontSize: '40px',
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: '20px',
    textAlign: 'left',
    
    
  };

  const columnStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    marginBottom: '50px',
    paddingLeft: '50px',
    paddingRight: '50px',
  };

  const contactInfoStyle = {
    flex: '1',
    marginRight: '20px',
    padding: '20px',
    backgroundColor: 'lightgray',
    borderRadius: '10px',
  };
  
return (

  
  <>

<div className = {classes.imagebackground}>
<div className= {classes.container_01}style={pageStyle}>
  
        <p className={classes.para_3}>  <span className= {classes.cinnamon}>VISION</span>,To share the magic of cinnamon by offering a thoughtfully curated collection of premium products that delight the senses and enrich lives. We are committed to sourcing the finest cinnamon 
        from around the world, crafting innovative and authentic creations, and fostering a 
        community that celebrates the versatility and benefits of this beloved spice.</p>
      </div>
  <div className= {classes.container_3}style={pageStyle}>
        <p className={classes.para_4}>  <span className= {classes.cinnamon}>MISSION</span>,To share the magic of cinnamon by offering a thoughtfully curated collection of premium products that delight the senses and enrich lives. We are committed to sourcing the finest cinnamon 
        from around the world, crafting innovative and authentic creations, and fostering a 
        community that celebrates the versatility and benefits of this beloved spice.</p>
  </div>

  <div className = {classes.container_1}>
        <p className= {classes.para_5}><span className= {classes.span1}>BEST CINNAMON</span> <span className= {classes.span2}>SINCE 2015.....</span> <span className= {classes.span3}>Our journey began with a love 
        for the distinctive aroma and flavor of cinnamon and we have since transformed that love into an array of offerings that cater to both your taste buds and your well-being</span> </p>
        <img src='/products/happy1.jpg' alt='Cinnamon Background' className={classes.imageClass} />

  </div>


  <section className="section">
          <div className={classes.con}>
            <div style={titleStyle}>
              <h1 className={classes.head1}>Contact Us</h1>
            </div>

            <div style={columnStyle}>
              <div style={contactInfoStyle}>
                <h2>Contact Information</h2>
                <div>
                  <img src='/products/phone1.png' alt='Phone' style={{ width: '80px', height: '80px', paddingTop: '10px' }} /> Phone: +1234567890
                </div>
                <div>
                  <img src='/products/email.png' alt='E-mail' style={{ width: '80px', height: '80px', paddingTop: '10px' }} /> Email: example@example.com
                </div>
                <div>
                  <img src='/products/loca.jpg' alt='Location' style={{ width: '80px', height: '80px', paddingTop: '10px' }} /> Address: 123 Street, City, Country
                </div>
              </div>

              </div>
              </div>
          
        </section>
        </div>

  </>
)
}


