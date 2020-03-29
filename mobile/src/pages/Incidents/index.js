import React, {useState,useEffect} from 'react';
import { Feather } from '@expo/vector-icons'
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import logoImg from '../../assets/logo.png';
import styles from './styles';
import api from '../../services/api'

export default function Incidents() {

    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigateToDetail(incident){
        navigation.navigate('Detail', {incident});
    }

    async function loadIncident(){

        //Usado para a quando a rolagem terminar, é feita uam verificação se é preciso fazer outra requisição
        if(loading){
            return;
        }

        //verifica se o total de casos é do tamanho o array incidentes(que vem com uma paginação)
        if(total > 0 && incidents.length === total){
            return
        }

        setLoading(true);

        const response = await api.get('http://IP:3333/incidents', {params: {page}});

        setLoading(false);
        setPage(page + 1);

        //recebe o array incidents + a respoat da requisição
        setIncidents([...incidents,...response.data]);

        //pega o total de registros do cabecalho
        setTotal(response.headers['x-total-count']);
    }

    useEffect(() => {
        loadIncident();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de<Text style={styles.headerTextBold}> {total} casos</Text>.
                </Text>
            </View>
            <Text style={styles.title}>Bem-vindo</Text>
            <Text style={styles.decription}>
                Escolha um dos casos abaixo e salve o dia.
            </Text>

            {/* 
            
            * showsVerticalScrollIndicator - tirar scroll
            * renderItem - renderizar o array incidents
            * onEndReached - chamar a função quando chegar ao final da rolagem
            * keyExtractor - chave de cada item
            
            */}
            <FlatList style={styles.incidentList} keyExtractor={incident => String(incident.id)} showsVerticalScrollIndicator={true} 
            onEndReached={loadIncident} onEndReachedThreshold={0.2}
            data={incidents} renderItem={({item:incident}) => (
                <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG</Text>
                    <Text style={styles.incidentValue}>{incident.name}</Text>

                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>

                    {/* 
                    
                    * Intl.NumberFormat = Uada para realizar a formatação para a moeda real
                    * onPress - obrigatório

                    */}
                    <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(incident)}>
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#E02041" />
                    </TouchableOpacity>
                </View>
            )} />
            

        </View>
    )
}
