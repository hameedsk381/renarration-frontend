import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';

const About = () => {
    const [htmlContent, setHtmlContent] = useState('');

    useEffect(() => {
        fetch('about.html')
            .then(response => response.text())
            .then(data => {
                console.log(data); // console response
                setHtmlContent(data);
            });
    }, []);

    return (
    <>
      <Navbar />
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </>
    );
};

export default About;
