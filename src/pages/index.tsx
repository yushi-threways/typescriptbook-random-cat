import { useState } from "react";
import type { NextPage, GetServerSideProps } from "next";

interface CatCategory {
    id: number;
    name: string;
}

interface SearchCatImage {
    breeds: string[];
    id: string;
    url: string;
    width: number;
    height: number;
}

type SearchCatImageResponse = SearchCatImage[];

const fetchCatImage = async () => {
    //https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/await
    //https://zenn.dev/kawaxumax/articles/0044a0e30536e2
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    // JSONオブジェクトに変換
    // https://typescriptbook.jp/reference/values-types-variables/type-assertion-as
    const result  = await res.json() as SearchCatImageResponse;
    return result[0];
}

interface IndexPageProps {
    initialCatImageUrl: string;
}

const IndexPage: NextPage<IndexPageProps> = ({ initialCatImageUrl }) => {
    const [catImageUrl, setCatImageUrl] = useState(initialCatImageUrl);

    const handleClick = async () => {
        const image = await fetchCatImage();
        setCatImageUrl(image.url);
    };

    return (
        <div>
            <button 
            onClick={handleClick}
            style={{
                backgroundColor: "#319795",
                border: "none",
                borderRadius: "4px",
                color: "white",
                padding: "4px 8px",
              }}
            >
                きょうのにゃんこ🐱
            </button>
            <div style={{ marginTop: 8, maxWidth: 500 }}>
                <img src={catImageUrl} width={500} height="auto" alt="猫" />
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
    const catImage = await fetchCatImage();
    return {
        props: {
            initialCatImageUrl: catImage.url,
        },
    };
};

export default IndexPage;