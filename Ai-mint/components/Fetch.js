import { Configuration, OpenAIApi } from "openai";
export const Fetch = async (promt) => {
    // const nftstorage_key = process.env.NFT_STORAGE_API_KEY;

    try {
        const configuration = new Configuration({
            apiKey: process.env.MY_APP_AI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);
        const response = await openai.createImage({
            prompt: "A cute baby sea otter",
            n: 2,
            size: "1024x1024",
        });
        console.log(response);
        const img = response.data.choices[0].url;
        return img;
    } catch (err) {
        console.log(err);
    }

};