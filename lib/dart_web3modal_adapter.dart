library web3modal_adapter;

import 'dart:async';
import 'dart:html';
import 'dart:typed_data';

import 'package:dart_solana_adapter/solana/core/public_key.dart';
import 'package:dart_solana_adapter/solana/core/transaction.dart';
import 'package:js/js.dart';
import 'package:js/js_util.dart';

Future<void> loadWeb3ModalAdapter() async {
  final script = ScriptElement();
  // Check if the app is running in production
  if (const bool.fromEnvironment('dart.vm.product')) {
    script.src =
        'assets/packages/dart_web3modal_adapter/lib/src/dart_web3modal_adapter.min.js';
  } else {
    script.src =
        'packages/dart_web3modal_adapter/lib/src/dart_web3modal_adapter.min.js';
  }
  script.type = 'text/javascript';
  document.head!.append(script);

  final completer = Completer<void>();
  script.onError.listen((_) {
    completer.completeError(Exception('Failed to load the script'));
  });
  script.onLoad.listen((_) {
    completer.complete();
  });
  return completer.future;
}

@JS('web3modal.modal')
external dynamic modal;

@JS('web3modal.openModal')
external Future<void> openModal();

@JS('web3modal.closeModal')
external Future<void> closeModal();

@JS('web3modal.disconnect')
external void disconnect();

@JS('web3modal.signMessage')
external Future<Uint8List> signMessage(Uint8List message);

@JS('web3modal.signTransaction')
external Future<Transaction> signTransaction(Transaction transaction);

@JS('web3modal.signTransactionTest')
external Future<Uint8List> signTransactionTest(Transaction transaction);

@JS('web3modal.signAndSendTransaction')
external Future<String> signAndSendTransaction(Transaction transaction);

@JS('web3modal.getPublicKey')
external PublicKey getPublicKey();

@JS('web3modal.getName')
external String getName();

@JS('web3modal.signAllTransactions')
external Future<List<Transaction>> _signAllTransactions(
  List<Transaction> transactions,
);

// without casting by hand it doesn't properly determine the type
Future<List<Transaction>> signAllTransactions(
  List<Transaction> transactions,
) async {
  final transactionsFuture =
      promiseToFuture<List<dynamic>>(_signAllTransactions(transactions));
  final untypedTransactions = await transactionsFuture;
  final typedTransactions = <Transaction>[];
  for (final transaction in untypedTransactions) {
    if (transaction is Transaction) {
      typedTransactions.add(transaction);
    } else {
      throw Exception('Unexpected transaction type');
    }
  }
  return typedTransactions;
}

@JS('web3modal.getBalance')
external Future<double> getBalance();

@JS('web3modal.isConnected')
external bool isConnected();

/// use this as
/// ```dart
/// listenIsConnected(allowInterop(
///   (connected) {
///     if (connected) {
///       onConnected();
///     } else {
///       onDisconnected();
///     }
///   }
/// ));
/// ```
@JS('web3modal.listenIsConnected')
external void listenIsConnected(void Function(bool connected) listen);

@JS('web3modal.handleError')
external void handleError(void Function(dynamic error) onError);

// provider is undefined when not connected so need to figure out how to call this methods
// looks like need to call [listenIsConnected]
// @JS('web3modal.setupWalletOnConnectEvent')
// external void setupWalletOnConnectEvent(
//     void Function(PublicKey publicKey) onConnect);

// @JS('web3modal.setupWalletOnDisconnectEvent')
// external void setupWalletOnDisconnectEvent(void Function() onDisconnect);

// @JS('web3modal.removeWalletOnConnectEvent')
// external void removeWalletOnConnectEvent(
//     void Function(PublicKey publicKey) onConnect);

// @JS('web3modal.removeWalletOnDisconnectEvent')
// external void removeWalletOnDisconnectEvent(void Function() onDisconnect);

class DartWeb3modalAdapter {
  DartWeb3modalAdapter();

  static void registerWith(registrar) {}
}
