import React, { useLayoutEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; // Import Ionicons

// Sample menu data
const menuData = [
  {
    id: '1',
    section: 'BreakFast',
    items: [
      { id: '1', name: 'IDLI', price: 1.80 },
      { id: '2', name: 'VADA', price: 2.00 },
      { id: '3', name: 'BONDA', price: 1.80 },
      { id: '4', name: 'POORI', price: 2.20 },
      { id: '5', name: 'UPMA', price: 2.20 },
    ],
  },
  {
    id: '2',
    section: 'DOSA',
    items: [
      { id: '6', name: 'PLAIN DOSA', price: 2.00 },
      { id: '7', name: 'SPICY DOSA', price: 2.25 },
      { id: '8', name: 'ONION DOSA', price: 2.25 },
      { id: '9', name: 'UPMA DOSA', price: 2.30 },
    ],
  },
  {
    id: '3',
    section: 'LUNCH',
    items: [
      { id: '10', name: 'VEG BIRYANI', price: 3.00 },
      { id: '11', name: 'SAMBAR RICE', price: 3.00 },
      { id: '12', name: 'YOGURT RICE', price: 2.50 },
    ],
  },
  {
    id: '4',
    section: 'SNACKS',
    items: [
      { id: '13', name: 'PUNUGULU', price: 3.00 },
      { id: '14', name: 'CHILLI BAJJI', price: 3.00 },
      { id: '15', name: 'POTATO POKORA', price: 3.20 },
    ],
  },
];


function renderCartBadge(totalItems) {
  if (totalItems > 0) {
    return (
      <View style={styles.cartQuantityBadge}>
        <Text style={styles.cartQuantityText}>{totalItems}</Text>
      </View>
    );
  }
  return null;
}

function renderMenuItem(subItem, handleAddToCart, cart) {
  const cartItem = cart.find((cartItem) => cartItem.id === subItem.id);
  return (
    <View key={subItem.id} style={styles.itemContainer}>
      <Text style={styles.itemText}>{subItem.name}</Text>
      <View style={styles.priceButtonContainer}>
        <Text style={styles.priceText}>${subItem.price.toFixed(2)}</Text>
        <TouchableOpacity style={styles.addButton}
          onPress={() => handleAddToCart(subItem)}>

          <Text style={styles.addButtonText}>
            {cartItem ? `+ ${cartItem.quantity}` : 'ADD'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function renderMenuSection(item, expandedSections, handleToggleSection, handleAddToCart, cart) {
  const isExpanded = expandedSections[item.id];
  return (
    <View key={item.id}>
      <TouchableOpacity style={styles.sectionHeader}
        onPress={() => handleToggleSection(item.id)} >
        <Text style={styles.sectionTitle}>{item.section}</Text>
        <Ionicons name={isExpanded ? 'caret-up-outline' : 'caret-down-outline'}
          size={24}
          color="#333"/>
      </TouchableOpacity>
      {isExpanded && item.items.map((subItem) => renderMenuItem(subItem, handleAddToCart, cart))}
    </View>
  );
}

function TakeawayScreen(props) {
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState('');
  const [displayMenu, setDisplayMenu] = useState(menuData);
  const [expandedSections, setExpandedSections] = useState({});

  function handleAddToCart(item) {
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);
    if (existingItemIndex > -1) {
      const newCart = [...cart];
      newCart[existingItemIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart([...cart, { ...item, price: Number(item.price), quantity: 1 }]);
    }
  }

  function handleToggleSection(sectionId) {
    setExpandedSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  }

  function updateFilter(txt) {
    setFilter(txt); 
    const filteredMenu = menuData.map((section) => {
      const filteredItems = section.items.filter((item) =>
        item.name.toLowerCase().includes(txt.toLowerCase())
      );
      return { ...section, items: filteredItems };
    }).filter((section) => section.items.length > 0);
    setDisplayMenu(filteredMenu);
  }

  function clearFilter() {
    setFilter('');
    setDisplayMenu(menuData);
  }

  useLayoutEffect(() => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    props.navigation.setOptions({
      headerRight: function () {
        return (
          <TouchableOpacity
            onPress={() => props.navigation.navigate('CartScreen', { cart })}
            style={{ marginRight: 16 }}
          >
            <Ionicons name="basket" size={24} color="#333" />
            {renderCartBadge(totalItems)}
          </TouchableOpacity>
        );
      },
    });
  }, [cart, props.navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search-sharp" size={24} color="#666" style={styles.searchIcon} />
        <TextInput style={styles.searchInput}
          placeholder='Search "dosa"' 
          value={filter} onChangeText={updateFilter} />
        {filter && (
          <TouchableOpacity onPress={clearFilter}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={displayMenu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          renderMenuSection(item, expandedSections, handleToggleSection, handleAddToCart, cart)
        }
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 80 }}
        keyboardShouldPersistTaps="handled"
      />

      {displayMenu.length === 0 && (
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: '#666' }}>No items found.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
     flex: 1, 
     backgroundColor: '#fff', 
     padding: 16,
    },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eee',
    margin: 20,
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333',
   },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#f5f5f5',
  },
  itemText: { 
    fontSize: 16, 
    color: '#333', 
    flex: 1  ,   
    marginLeft: 20 , 
    marginTop: 10, 
    marginBottom: 10,
  },
  priceButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 120,
  },
  priceText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'right',
    marginRight: 18, 
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f33',
    padding: 6,
    marginRight: 10,
    borderRadius: 6,
  },
  addButtonText: { 
    color: '#f33', 
    fontWeight: 'bold',
     marginRight: 4,
     },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  searchIcon: {
    position: 'absolute',
    left: 8,
    zIndex: 1, 
  },
  searchInput: { 
    flex: 1, 
    marginLeft: 40, 
    fontSize: 16,
  }, 
  clearText: {
    color: '#f33',
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  cartQuantityBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#f33', 
    borderRadius: 12, 
    width: 18, 
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartQuantityText: {
    fontSize: 12,
    color: '#fff',
  },
});

export default TakeawayScreen;
