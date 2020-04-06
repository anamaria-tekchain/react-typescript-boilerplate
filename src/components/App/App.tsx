import * as React from 'react';

const styles = require('./App.css');

interface IAppProps {
    name: string;
}

export default function App({name}: IAppProps) {
    return (
        <div id="appContainer" className={styles.container}>
            Hello {name}
        </div>
    );
}