import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  AppBar, Box, Button, Card, CardContent, CircularProgress, Container, Toolbar,
} from '@mui/material';
import { ArrowBack, NavigateNext } from '@mui/icons-material';
import { extractApi, getAnnotationById } from '../apis/extractApis';

const styleHtmlString = (htmlString) => {
  // Wrap the HTML string in a container with the specified style
  const styledHtmlString = `
    <div>
      ${htmlString}
    </div>
  `;

  return styledHtmlString;
};

function Sweet() {
  const { id } = useParams();
  const [node, setNode] = useState(null);
  const [htmlContent, setHtmlContent] = useState(null);
  const [annotationNode, setAnnotationNode] = useState(null);
  const navigate = useNavigate();
  const [source, setSource] = useState('/');
  const fetchData = async () => {
    try {
      const res = await axios.post(`${getAnnotationById}`,{id}); // Assuming the correct endpoint

      const block = res.data;
      const webpage = await axios.post(
        extractApi,
        { url: block.source },
      );

      setSource(block.source);
      setNode(block.target.id);
      setHtmlContent(webpage.data);
      setAnnotationNode(styleHtmlString(block.body.value));
    } catch (error) {
      // Handle the error
    }
  };
  const highlightElement = (htmlContent, node, annotationNode) => {
    if (htmlContent && node) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent.replace(/href=".*?"/g, ''), 'text/html');

      const nodes = doc.querySelectorAll(`[data-id="${node}"]`);
      if (nodes.length > 0) {
        const targetNode = nodes[0];
// console.log(targetNode);
        // Create a wrapper div for both the original node and the annotation
        const wrapperDiv = doc.createElement('div');
        wrapperDiv.style.backgroundColor = '#C9E3FE';
        wrapperDiv.style.padding = '10px'; // Adjust padding as needed
        wrapperDiv.style.width = '100%';
        wrapperDiv.style.marginBlock = '10px';

        const details = doc.createElement('details');
        const summary = doc.createElement('summary');
        summary.textContent = 'View original story';
        details.appendChild(summary);
        const originalNode = targetNode.cloneNode(true);
        details.appendChild(originalNode);
        // Add a divider between the original node and the annotation
        const divider = doc.createElement('hr');
        details.appendChild(divider);

        wrapperDiv.appendChild(details);

        // Create a div for the annotation content and append it to the wrapper
        const annotationDiv = doc.createElement('div');
        annotationDiv.innerHTML = annotationNode;
        wrapperDiv.appendChild(annotationDiv);

        // Replace the original node with the wrapper in the DOM structure
        targetNode.parentNode.replaceChild(wrapperDiv, targetNode);

        // Serialize the modified document back to HTML string
        const htmlString = new XMLSerializer().serializeToString(doc);
        return htmlString;
      }
      
      return `<html>
                <body>
                    <p>No sweet found</p>
                </body>
            </html>`;
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (!node || !htmlContent) {
    return (
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',
      }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Button onClick={() => { navigate(-1); }} color="inherit" startIcon={<ArrowBack />} aria-label="settings">
            Go back
          </Button>
          <Button color="inherit" href={source} target="_blank" endIcon={<NavigateNext />} aria-label="settings">
            Go to source page
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
      <div dangerouslySetInnerHTML={{ __html: highlightElement(htmlContent, node, annotationNode) }} />
      </Container>
    </Box>

  );
}
export default Sweet;
