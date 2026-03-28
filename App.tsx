import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Image,
  Button,
  Touchable, TouchableOpacity, FlatList
} from 'react-native';
import News from './src/components/NewsItems';

import {fetchNewsService, NewsData} from './src/utils/handle-api';
import NewsList from "./src/components/NewsList";

export default function App() {
  const [newsList, setNewsList] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const data = await fetchNewsService();
      setNewsList(data);
    } catch (err: any) {
      setError(err.message || "Erro ao obter notícias");
    } finally {
      setLoading(false);
    }
  };

  let countNews = newsList.length

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Image source={require('./assets/newspaper-banner.png')} style={{width: 40, height: 40}} />
        <Text style={styles.headerTitle}>Últimas notícias</Text>
        <Text style={styles.headerCountNews}>Quantidade de notícias: {countNews}</Text>
        <TouchableOpacity style={styles.headerButtom} onPress={fetchNews}>Recarregar Notícias</TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Carregando notícias...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Erro: {error}</Text>
        </View>
      ) : (
          <NewsList newsList={newsList}></NewsList>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    padding: 16,
    backgroundColor: '#000000',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
    paddingTop: 40, // Ensure header is spaced from exact top
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: "#f0f0f0",
  },
  headerButtom: {
    color: "#000000",
    backgroundColor: "#f0f0f0",
    padding: 6,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    fontSize: 12,
  },
  headerCountNews: {
    fontSize: 12,
    fontWeight: 'bold',
    color: "#f0f0f0",
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  scrollContent: {
    padding: 16,
  },
});
