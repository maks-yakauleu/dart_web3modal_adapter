library web3modal_adapter;

import 'dart:async';
import 'dart:html';
import 'dart:typed_data';

import 'package:dart_solana_adapter/solana/core/public_key.dart';
import 'package:dart_solana_adapter/solana/core/transaction.dart';
import 'package:js/js.dart';

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

//these are undefined
// @JS('web3modal.isConnected')
// external void isConnected();

// @JS('web3modal.getWalletName')
// external String? getWalletName();

// @JS('web3modal.getWalletIcon')
// external String? getWalletIcon();

class DartWeb3modalAdapter {
  const DartWeb3modalAdapter();

  @JS('web3modal.modal')
  external static dynamic modal;

  @JS('web3modal.openModal')
  external static Future<void> openModal();

  @JS('web3modal.closeModal')
  external static Future<void> closeModal();

  @JS('web3modal.disconnect')
  external static Future<void> disconnect();

  @JS('web3modal.signMessage')
  external static Future<Uint8List> signMessage(Uint8List message);

  @JS('web3modal.signTransaction')
  external static Future<Uint8List> signTransaction(Transaction transaction);

  @JS('web3modal.getPublicKey')
  external static PublicKey getPublicKey();

  @JS('web3modal.getName')
  external static String getName();

  static void registerWith(registrar) {}
}
