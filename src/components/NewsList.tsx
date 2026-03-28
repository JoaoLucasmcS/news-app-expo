import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import NewsItem from './NewsItems';
import { NewsData } from '../utils/handle-api';

interface NewsListProps {
    newsList: NewsData[];
}

export default function NewsList({ newsList }: NewsListProps) {
    return (
        <FlatList
            data={newsList}
            renderItem={({ item }) => <NewsItem item={item} />}
            keyExtractor={(item, index) => item.link ?? index.toString()}
            contentContainerStyle={styles.listContent}
        />
    );
}

const styles = StyleSheet.create({
    listContent: {
        padding: 16,
    },
});