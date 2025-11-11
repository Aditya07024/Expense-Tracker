import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";
import { formatDate } from "../lib/utils";

// Map categories to their respective icons
const CATEGORY_ICONS = {
  "food & drinks": "fast-food",
  shopping: "cart",
  transportation: "car",
  entertainment: "film",
  bills: "receipt",
  income: "cash",
  other: "ellipsis-horizontal",
};

export const TransactionItem = ({ item, onDelete }) => {
  if (!item) return null;

  const categoryKey = item.category?.toLowerCase() || "other";
  const isIncome = item.category?.toLowerCase() === "income";
  const iconName = CATEGORY_ICONS[categoryKey] || "pricetag-outline";

  return (
    <View style={styles.transactionCard}>
      <TouchableOpacity style={styles.transactionContent}>
        <View style={styles.categoryIconContainer}>
          <Ionicons
            name={iconName}
            size={22}
            color={isIncome ? COLORS.income : COLORS.expense}
          />
        </View>

        <View style={styles.transactionLeft}>
          <Text style={styles.transactionTitle}>{item.title || "Untitled"}</Text>
          <Text style={styles.transactionCategory}>{item.category || "Other"}</Text>
        </View>

        <View style={styles.transactionRight}>
          <Text
            style={[
              styles.transactionAmount,
              { color: isIncome ? COLORS.income : COLORS.expense },
            ]}
          >
            {isIncome ? "+" : "-"}₹{Math.abs(parseFloat(item.amount) || 0).toFixed(2)}
          </Text>
          <Text style={styles.transactionDate}>
            {formatDate(item.created_at)}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete?.(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color={COLORS.expense} />
      </TouchableOpacity>
    </View>
  );
};