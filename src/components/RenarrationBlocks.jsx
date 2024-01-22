import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteRenarrationBlock } from '../redux/actions';  // Adjust the path to your action creators
import { Link } from 'react-router-dom';

const RenarrationBlocks = ({ renarrationBlocks, deleteRenarrationBlock }) => {
    useEffect(() => {
     console.log(renarrationBlocks[0].content.html)
    }, [])
    
    const handleDelete = (blockId) => {
        deleteRenarrationBlock(blockId);
    };

    return (
        <div>
            <h1>Renarration Blocks</h1>
            <Link to='/re-narrate'> back to renarrate</Link>
            {renarrationBlocks.map(block => (
                <div key={block.id}>
                    <div dangerouslySetInnerHTML={{ __html: block.content.html }} />
                    <p>Description: {block.description}</p>
                    <button onClick={() => handleDelete(block.id)}>Delete</button>
                    <hr />
                </div>
            ))}
        </div>
    );
};

const mapStateToProps = (state) => ({
    renarrationBlocks: state.renarrationBlocks.renarrationBlocks,
});

const mapDispatchToProps = {
    deleteRenarrationBlock,
};

export default connect(mapStateToProps, mapDispatchToProps)(RenarrationBlocks);
