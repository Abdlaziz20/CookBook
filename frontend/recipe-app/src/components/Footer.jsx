import React from 'react'

function Footer() {
  return (
    <footer style={StyleSheet.footer}>
      <p style={StyleSheet.txt}>© {new Date().getFullYear()} Recipe App. All rights reserved.</p>
    </footer>
  )
}

const StyleSheet = {
  footer: {
    backgroundColor: "#f1ac89ff",
    padding: "20px",
    textAlign: "center",
    marginTop: "20px",

  },
  txt: {
    margin: "0",
    fontSize: "14px",
  },
};

export default Footer
