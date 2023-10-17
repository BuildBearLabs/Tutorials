import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Row, Form, Button } from 'react-bootstrap';
import { create as ipfsHttpClient } from 'ipfs-http-client';

const projectId = '2QmL62UkGTqARQPRAjNozkE2y0I';
const projectSecretKey = 'fe746af2d6934064deb28a827d2aa3d5';
const authorization = 'Basic ' + btoa(projectId + ':' + projectSecretKey);

const ipfs = ipfsHttpClient({
  url: 'https://ipfs.infura.io:5001/api/v0',
  headers: {
    authorization,
  },
});

const Create = ({ marketplace, nft }) => {
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const uploadToIPFS = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (typeof file !== 'undefined') {
      try {
        const result = await ipfs.add(file);
        console.log(result);
        setImage(`https://localhost:3001/ipfs/${result.path}`);
      } catch (error) {
        console.error('IPFS image upload error:', error);
      }
    }
  };

  const createNFT = async () => {
    if (!image || !price || !name || !description) return;

    try {
      const result = await ipfs.add(JSON.stringify({ image, price, name, description }));
      await mintThenList(result);
    } catch (error) {
      console.error('IPFS URI upload error:', error);
    }
  };

  const mintThenList = async (result) => {
    const uri = `https://localhost:3001/ipfs/${result.path}`;
    // Mint NFT
    await (await nft.mint(uri)).wait();
    // Get tokenId of new NFT
    const id = await nft.tokenCount();
    // Approve marketplace to spend NFT
    await (await nft.setApprovalForAll(marketplace.address, true)).wait();
    // Convert price to Wei
    const listingPrice = ethers.utils.parseEther(price.toString());
    // Add NFT to marketplace
    await (await marketplace.makeItem(nft.address, id, listingPrice)).wait();
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '1000px' }}>
          <div className="content mx-auto">
            <Row className="g-4">
              <Form.Control
                type="file"
                required
                name="file"
                onChange={uploadToIPFS}
              />
              <Form.Control
                onChange={(e) => setName(e.target.value)}
                size="lg"
                required
                type="text"
                placeholder="Name"
              />
              <Form.Control
                onChange={(e) => setDescription(e.target.value)}
                size="lg"
                required
                as="textarea"
                placeholder="Description"
              />
              <Form.Control
                onChange={(e) => setPrice(e.target.value)}
                size="lg"
                required
                type="text" // Keep this as "text"
                placeholder="Price in ETH"
              />
              <div className="d-grid px-0">
                <Button onClick={createNFT} variant="primary" size="lg">
                  Create & List NFT!
                </Button>
              </div>
            </Row>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Create;
