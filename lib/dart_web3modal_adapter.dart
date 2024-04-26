library web3modal_adapter;

import 'dart:async';
import 'dart:html';

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

@JS('web3modal.modal')
external dynamic modal;

@JS('web3modal.openModal')
external Future<void> openModal();

@JS('web3modal.closeModal')
external Future<void> closeModal();

@JS('web3modal.disconnect')
external Future<void> disconnect();

@JS('web3modal.isConnected')
external bool isConnected();

class DartWeb3modalAdapter {
  DartWeb3modalAdapter();

  static void registerWith(registrar) {}
}
