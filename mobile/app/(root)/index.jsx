import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, router, useRouter } from "expo-router";
import { Alert, FlatList, Image, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { SignOutButton } from "@/components/SignOutButton";
import { useEffect, useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";
import PageLoader from "../../components/PageLoader";
import { styles } from "../../assets/styles/home.styles";
import {Ionicons} from "@expo/vector-icons";
import {BalanceCard} from "../../components/BalanceCard";
import { TransactionItem } from "../../components/transactionItem";
import NoTransactionsFound from "../../components/NoTransactionFound";

export default function Page() {
  const router=useRouter();
  const { user } = useUser();
  const [refreshing, setRefreshing] = useState(false);
  const { transactions, summary, isLoading, loadData, deleteTransaction } =
    useTransactions(user.id);
  useEffect(() => {
    loadData();
  }, [loadData]);
  const onRefresh=async()=>{
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }
  const handleDelete=async(id)=>{
    Alert.alert("Delete", "Are you sure you want to Delete?", [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: deleteTransaction(id)
          },
        ]);
  }
  console.log(summary);
  if(isLoading&&!refreshing) return <PageLoader />

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          {/* Left */}
          <View style={styles.headerLeft}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>{user?.emailAddresses[0]?.emailAddress.split('@')[0]}</Text>
            </View>
          </View>
          {/* Right */}
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.addButton} onPress={()=>router.push("/create")}>
              <Ionicons name="add-circle" size={20} color="#fff" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <SignOutButton />
          </View>
          </View>
          <BalanceCard summary={summary} />
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
        </View>
        <FlatList
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}
        data={transactions}
        renderItem={({item})=>(
          <TransactionItem item={item} onDelete={handleDelete}/>
        )}
        ListEmptyComponent={<NoTransactionsFound />}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        />
      </View>
  );
}
