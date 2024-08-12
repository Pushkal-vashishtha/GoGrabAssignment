import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#4a148c',
  secondary: '#ff6f00',
  background: '#f5f5f5',
  text: '#333',
  lightText: '#757575',
  white: '#fff',
  error: '#b71c1c',
  success: '#4caf50',
  warning: '#ff9800',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  cardStatus: {
    fontSize: 16,
    color: colors.lightText,
    marginBottom: 8,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});