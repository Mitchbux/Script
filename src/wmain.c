/* File generated automatically by the QuickJS compiler. */

#include "quickjs-libc.h"

const uint32_t qjsc_wmain_size = 35;

const uint8_t qjsc_wmain[35] = {
 0x02, 0x01, 0x0e, 0x77, 0x6d, 0x61, 0x69, 0x6e,
 0x2e, 0x63, 0x0e, 0x00, 0x06, 0x00, 0x9e, 0x01,
 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x02, 0x01,
 0xa0, 0x01, 0x00, 0x00, 0x00, 0xc6, 0x28, 0xbe,
 0x03, 0x01, 0x00,
};

int main(int argc, char **argv)
{
  JSRuntime *rt;
  JSContext *ctx;
  rt = JS_NewRuntime();
  ctx = JS_NewContextRaw(rt);
  JS_SetModuleLoaderFunc(rt, NULL, js_module_loader, NULL);
  JS_AddIntrinsicBaseObjects(ctx);
  JS_AddIntrinsicDate(ctx);
  JS_AddIntrinsicEval(ctx);
  JS_AddIntrinsicStringNormalize(ctx);
  JS_AddIntrinsicRegExp(ctx);
  JS_AddIntrinsicJSON(ctx);
  JS_AddIntrinsicProxy(ctx);
  JS_AddIntrinsicMapSet(ctx);
  JS_AddIntrinsicTypedArrays(ctx);
  JS_AddIntrinsicPromise(ctx);
  JS_AddIntrinsicBigInt(ctx);
  js_std_add_helpers(ctx, argc, argv);
  js_std_eval_binary(ctx, qjsc_wmain, qjsc_wmain_size, 0);
  js_std_loop(ctx);
  JS_FreeContext(ctx);
  JS_FreeRuntime(rt);
  return 0;
}
