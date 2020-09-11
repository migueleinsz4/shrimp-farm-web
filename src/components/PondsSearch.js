import React from "react";
import { Input } from 'antd';

export const PondsSearch = () => {
    return(
        <div>
            <Input.Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
        </div>
    );
};
