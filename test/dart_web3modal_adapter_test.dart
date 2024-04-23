import 'package:dart_web3modal_adapter/dart_web3modal_adapter.dart';
import 'package:dart_web3modal_adapter/dart_web3modal_adapter_method_channel.dart';
import 'package:dart_web3modal_adapter/dart_web3modal_adapter_platform_interface.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:plugin_platform_interface/plugin_platform_interface.dart';

class MockDartWeb3modalAdapterPlatform
    with MockPlatformInterfaceMixin
    implements DartWeb3modalAdapterPlatform {
  @override
  Future<String?> getPlatformVersion() => Future.value('42');
}

void main() {
  final DartWeb3modalAdapterPlatform initialPlatform = DartWeb3modalAdapterPlatform.instance;

  test('$MethodChannelDartWeb3modalAdapter is the default instance', () {
    expect(initialPlatform, isInstanceOf<MethodChannelDartWeb3modalAdapter>());
  });

  test('getPlatformVersion', () async {
    DartWeb3modalAdapterPlugin dartWeb3modalAdapterPlugin = DartWeb3modalAdapterPlugin();
    MockDartWeb3modalAdapterPlatform fakePlatform = MockDartWeb3modalAdapterPlatform();
    DartWeb3modalAdapterPlatform.instance = fakePlatform;

    expect(await dartWeb3modalAdapterPlugin.getPlatformVersion(), '42');
  });
}
